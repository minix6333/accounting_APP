import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, StyleSheet, Alert, TouchableOpacity } from "react-native";
// import { IconButton, Stack } from "@react-native-material/core";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Button, IconButton } from "react-native-paper";
function HomeHeader() {
    const [date, setdate] = useState(1);
    const limitdate = (date) => {
        let limdate = date
        limdate = Math.min(12, Math.max(1, limdate))
        setdate(limdate)
        // console.log(date);
    }
    const [newDate, setNewDate] = useState(date)
    // // console.log(newDate);
    // useEffect(() => {
    //     fetch(`http://192.168.1.107:3000/gm/${newDate}`, {
    //         method: "GET",
    //     })
    //         .then(resp => resp.json())
    //         .then(user => {
    //             setNewDate(user)
    //             console.log(setNewDate(user));
    //         })
    // },[date])
    return (
        <View style={{flex:1}}>
            <StatusBar
                style="auto"
                barStyle="light-content"
                backgroundColor={"#3f3f46"}
            />
            <View style={{ flex:1,backgroundColor: "#3f3f46", alignItems: "center", flexDirection: "row" }}>
                <View style={{ flex: 1, alignItems: "flex-start" }}></View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={[styles.text]}>帳單</Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}></View>

            </View>
            <View style={{ backgroundColor: "#3f3f46", flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1, alignItems: "flex-start" }}>
                    <IconButton
                        icon="arrow-left"
                        size={20}
                        onPress={() => { limitdate(date - 1) }}
                        style={{ backgroundColor: "white", padding: 1 }}
                    ></IconButton>
                </View>
                <View style={{ flex: 1, alignItems: "center" ,marginTop:15 }}>
                    <TouchableOpacity onPress={() => { }}><Text style={{ color: "white" }}>{date}月</Text></TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <IconButton
                        icon="arrow-right"
                        size={20}
                        style={{ marginLeft: 170, backgroundColor: "white", padding: 1 }}
                        onPress={() => { limitdate(date + 1) }}

                    ></IconButton>
                </View>
            </View>
        </View>
    );
}
export default HomeHeader;

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: "white",
    }
})
