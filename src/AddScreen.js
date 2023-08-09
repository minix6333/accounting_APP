import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Button, TextInput } from "react-native-paper"
import { useNavigation } from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

const NewView = ({ changeView }) => {
    const [date, setDate] = useState(new Date())
    const [assets, setAssets] = useState("錢包")
    const [price, setPrice] = useState("")
    const [income, setIncome] = useState("")
    const [content, setContent] = useState("")
    const navigation = useNavigation();
    const [showPicker, setShowPicker] = useState(false);
    const insert = (props) => {
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
                navigation.navigate("home")
            })
            .catch(error => console.log(error))
    }
    //將篩選的date顯示在textinput上
    const formatDate = (date) => {
        const month = `0${date.getMonth() + 1}`.slice(-2); //將1轉成01
        const day = `0${date.getDate()}`.slice(-2);
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };
    return (
        <View style={{ flex: 1, backgroundColor: "#3f3f46" }}>
            <Button style={{ backgroundColor: "#60a5fa", marginTop: 15 }} title="press" onPress={changeView}><Text style={styles.buttomText}>收入</Text></Button>
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
                textStyle={{ fontSize: 16, paddingTop: 16, paddingBottom: 8, paddingLeft: 16, color: '#454545' }}
                defaultValue={'錢包'}
                dropdownStyle={{ width: 200 }}
                dropdownTextStyle={{ fontSize: 16 }}
                renderButtonText={text => setAssets(text)}
                options={['錢包', '銀行']}
            />
            <TextInput style={styles.inputStyle}
                label="金額"
                value={income}
                textColor="white"
                mode="outlined"
                keyboardType="numeric"
                numberOfLines={5}
                onChangeText={text => setIncome(text)}
            />
            <TextInput style={styles.inputStyle}
                label="內容"
                value={content}
                textColor="white"
                mode="outlined"
                numberOfLines={10}
                onChangeText={text => setContent(text)}
            />
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
                <Button style={{ backgroundColor: "#60a5fa", marginTop: 30, width: 100 }} onPress={() => insert()} icon="pen">
                    <Text style={styles.buttomText}>新增</Text>
                </Button>
            </View>
        </View>
    )
};

const AssetsScreen = (props) => {

    const [date, setDate] = useState(new Date())
    const [assets, setAssets] = useState("")
    const [price, setPrice] = useState("")
    const [income, setIncome] = useState("")
    const [content, setContent] = useState("")
    const navigation = useNavigation();
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
                navigation.navigate("home")
            })
            .catch(error => console.log(error))
    }
    //將篩選的date顯示在textinput上

    const [viewOne, setViewOne] = useState(true);
    const changeView = () => {
        setViewOne(!viewOne);
    }
    if (!viewOne) return <NewView changeView={changeView} />
    const formatDate = (date) => {
        const month = `0${date.getMonth() + 1}`.slice(-2); //將1轉成01
        const day = `0${date.getDate()}`.slice(-2);
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };
    return (
        <View style={{ flex: 1, backgroundColor: "#3f3f46" }}>
            <Button style={{ backgroundColor: "#f87171", marginTop: 15 }} title="press" onPress={changeView}><Text style={styles.buttomText}>支出</Text></Button>
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
                textStyle={{ fontSize: 16, paddingTop: 16, paddingBottom: 8, paddingLeft: 16, color: '#454545' }}
                defaultValue={'錢包'}
                dropdownStyle={{ width: 200 }}
                dropdownTextStyle={{ fontSize: 16 }}
                renderButtonText={text => setAssets(text)}
                options={['錢包', '銀行']}
            />
            <TextInput style={styles.inputStyle}
                label="金額"
                value={price}
                textColor="white"
                mode="outlined"
                keyboardType="numeric"
                numberOfLines={5}
                onChangeText={text => setPrice(text)}
            />
            <TextInput style={styles.inputStyle}
                label="內容"
                value={content}
                textColor="white"
                mode="outlined"
                numberOfLines={10}
                onChangeText={text => setContent(text)}
            />
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
                <Button style={{ backgroundColor: "#f87171", marginTop: 30, width: 100 }} onPress={() => insert()} icon="pen">
                    <Text style={styles.buttomText}>新增</Text>
                </Button>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    inputStyle: {
        margin: 6,
        marginTop: 5,
        backgroundColor: "#737373",
        // padding:5
    },
    buttomText: {
        color: "black",
    },
    selectStyle: {
        margin: 6,
        marginTop: 8,
        backgroundColor: "#737373",
        height: 52,
        borderRadius: 4,

    }
})
export default AssetsScreen