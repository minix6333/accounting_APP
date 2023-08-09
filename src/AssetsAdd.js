import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { TextInput, Button, } from 'react-native-paper'
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

const AssestsAdd = (props) => {
    const [date, setDate] = useState(new Date())
    const [assets, setAssets] = useState("錢包")
    const [income, setIncome] = useState("")
    const [price, setPrice] = useState("")
    const [content, setContent] = useState("")
    const [showPicker, setShowPicker] = useState(false);
    const insert = () => {
        fetch("http://192.168.1.107:3000/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date: date.toISOString(),
                assets: assets,
                price: price,
                income: income,
                content: content,
            })
        })
            .then(resp => resp.json())
            .then(data => {
                props.navigation.navigate("home", { data: data })
            })
            .catch(error => console.log(error))

    }
    const formatDate = (date) => {
        const month = `0${date.getMonth() + 1}`.slice(-2); //將1轉成01
        const day = `0${date.getDate()}`.slice(-2);
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };
    const income_or_price = (num) => {
        if (num > 0) {
            setIncome(num)
        } else {
            setPrice(Math.abs(num))
        }
    }
    const export_content = (text) => {
        console.log(text)
        if (text == '') {
            Alert.alert("",
                "請輸入內容",
                [
                    {
                        text: "確認",
                        style: "cancel",
                    },
                ],
            )
        } else {
            insert()
        }
    }
    return (

        <View style={{ flex: 1, backgroundColor: "#404040" }} >
            <TextInput
                style={styles.inputStyle}
                label="日期"
                textColor="white"
                keyboardType="none"
                value={formatDate(date)}
                mode="outlined"
                numberOfLines={5}
                onFocus={() => setShowPicker(true)}
                placeholder='0000-00-00'
            />
            {showPicker && (
                <DateTimePicker value={date} onChange={(event, selectedDate) => { setDate(selectedDate); setShowPicker(false) }} />
            )}

            <ModalDropdown style={styles.selectStyle}
                textStyle={{ fontSize: 16, paddingTop: 8, paddingBottom: 8, paddingLeft: 15, color: '#454545' }}
                defaultValue={'錢包'}
                dropdownStyle={{ width: 200 }}
                dropdownTextStyle={{ fontSize: 16 }}
                renderButtonText={text => setAssets(text)}
                options={['錢包', '銀行']}
            />
            <TextInput style={styles.inputStyle}
                label="金額"
                mode="outlined"
                numberOfLine545s={20}
                onChangeText={text => income_or_price(text)}
            />
            <TextInput style={styles.inputStyle}
                label="內容"
                mode="outlined"
                numberOfLines={10}
                onChangeText={text => setContent(text)}
            />

            <View style={styles.btStyle}>
                <Button style={{ backgroundColor: "#60a5fa", marginTop: 30, width: 100 }} onPress={() => export_content(content)} icon="content-save-settings">
                    <Text style={styles.buttomText}>保存</Text>
                </Button>
            </View>
        </View>
    )
}
export default AssestsAdd
const styles = StyleSheet.create({
    selectStyle: {
        margin: 10,
        marginTop: 5,
        backgroundColor: "#737373",
        height: 45,
        borderRadius: 4,

    },
    inputStyle: {
        margin: 10,
        marginTop: 5,
        backgroundColor: "#737373",
        // padding:5
    },
    buttomText: {
        color: "black",
    },
    btStyle: {
        flexDirection: "row",
        justifyContent: "center",
        margin: 30,
        padding: 20,
        marginTop: 1,

    }
})
