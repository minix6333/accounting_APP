import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

function UpdateScreen(props) {
    const data = props.route.params.data;
    const [date, setDate] = useState(new Date(data.date))
    const [assets, setAssets] = useState(data.assets)
    const [price, setPrice] = useState(String(data.price))
    const [income, setIncome] = useState(String(data.income))
    const [content, setContent] = useState(data.content)
    const [showPicker, setShowPicker] = useState(false);
    const updateData = () => {
        fetch(`http://192.168.1.107:3000/up/${data.id}`,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date:date.toISOString() , 
                assets:assets ,
                price:price , 
                income:income ,
                content:content ,
            })
        })
        .then(resp => resp.json())
        .then(data => {
            props.navigation.navigate("home" , {data:data})
        })
        .catch(error => console.log(error))
    }
    const deleteData = () => {
        fetch(`http://192.168.1.107:3000/dt/${data.id}/`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(data => {
            props.navigation.navigate("home")
        }).catch(error => console.log(error))
    }
    const formatDate = (date) => {
        const month = `0${date.getMonth() + 1}`.slice(-2); //將1轉成01
        const day = `0${date.getDate()}`.slice(-2);
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };
    return (
        <View style={{ flex: 1 , backgroundColor:"#3f3f46" }} >
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
                textStyle={{fontSize: 16, paddingTop: 16, paddingBottom: 8,paddingLeft:16,color:'#454545'}}
                defaultValue={'錢包'}
                dropdownStyle={{width:200}}
                dropdownTextStyle={{fontSize: 16}}
                renderButtonText={text=>setAssets(text)}
                options={['錢包','銀行']}
            />
            <TextInput style={styles.inputStyle}
                label="支出"
                value={price}
                textColor="white"
                mode="outlined"
                numberOfLine545s={20}
                keyboardType="numeric"
                onChangeText={text => setPrice(text)}
            />
            <TextInput style={styles.inputStyle}
                label="收入"
                value={income}
                textColor="white"
                mode="outlined"
                keyboardType="numeric"
                numberOfLine545s={20}
                onChangeText={text => setIncome(text)}
            />
            <TextInput style={styles.inputStyle}
                label="內容"
                value={content}
                textColor="white"
                mode="outlined"
                numberOfLine545s={20}
                onChangeText={text => setContent(text)}
            />
            <View style={styles.btStyle}>
                <Button style={{ backgroundColor: "#60a5fa", marginTop: 30, width: 100 }} onPress={() => updateData()} icon="content-save-settings">
                    <Text style={styles.buttomText}>保存</Text>
                </Button>
                <Button style={{ backgroundColor: "#f87171", marginTop: 30, width: 100 }} onPress={() => deleteData()} icon="trash-can">
                    <Text style={styles.buttomText}>刪除</Text>
                </Button>
            </View> 
        </View>
    )
}
export default UpdateScreen
const styles = StyleSheet.create({
    inputStyle: {
        margin: 10,
        marginTop: 5,
        backgroundColor:"#737373",
        // padding:5
    },
    buttomText: {
        color: "black",
    },
    btStyle:{
        flexDirection:"row",
        justifyContent:"space-between",
        margin:30,
        padding:20,
        marginTop:1
    },
    selectStyle:{
        margin:8,
        marginTop: 8,
        backgroundColor:"#737373",
        height:52,
        borderRadius:4,
        
    }
})
