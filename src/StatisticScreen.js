import React, { useState, useEffect } from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, FlatList } from 'react-native';
import StatisticHeader from "./StatisticHeader";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { FontAwesome, Foundation, Entypo, Feather, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';
import { BottomTabNavigator } from "@react-navigation/bottom-tabs";


const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
    }
}

const screenWidth = Dimensions.get("window").width;

function Inmoney() {
    const [data, setdata] = useState([])
    const [loading, setLoding] = useState(true)
    const loadData = () => {
        fetch("http:/192.168.1.107:3000/get", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => resp.json())
            .then(user => {
                setdata(user)
                setLoding(false)

            })
        // .catch(error => console.log(error))
    }
    useEffect(() => {
        fetch("http://192.168.1.107:3000/get", {
            method: "GET",
        })
            .then(resp => resp.json())
            .then(user => {
                setdata(user)
                setLoding(false)
            }).catch(error => console.log(error))
    }, [])
    function getRandomColor() {  //隨機顏色
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
    const Inmoneydata = [];
    let ic = 0
    if (data && data.length > 0) {
        const incomes = data.map(item => item.income)//映射到新數組//支出總數
        ic = incomes
    }
    let ct = ""
    if (data && data.length > 0) {
        const contents = data.map(item => item.content)//映射到新數組//支出總數
        ct = contents
    }
    for (let i = 0; i < ct.length; i++) {
        const piedata = {
            name: ct[i],
            population: ic[i],
            color: getRandomColor(),
            legendFontColor: "#FFFFFF",
            legendFontSize: 15
        };
        Inmoneydata.push(piedata)
    }
    const renderData = (item) => {
        return (
            <View>
                <View style={{ flex: 1, alignItems: "center", flexDirection: "row" }}>
                    <View style={{ flex: 1, alignItems: "flex-start", borderBottomWidth: 0.5, margin: 6 }}>
                        <Text style={{ color: "white", fontSize: 16 }}>{item.content}</Text>

                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end", borderBottomWidth: 0.5, margin: 6 }}>
                        <Text style={{ color: "white", fontSize: 16 }}>{item.income}<Foundation style={{ margintop: 10 }} name="dollar" size={20} color="#1a91ff" /></Text>
                    </View>
                </View>


            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#808080"
            }}>
                <View style={{ flex: 1 }}>
                    <PieChart
                        data={Inmoneydata}
                        width={screenWidth}
                        height={250}
                        chartConfig={chartConfig}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[10, 10]}
                        absolute
                    />
                </View>
            </View>
            <View style={{ flex: 1.3, backgroundColor: "#3f3f46" }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return renderData(item);
                    }}
                    onRefresh={() => [loadData()]}
                    refreshing={loading}
                />
            </View>
        </View>


    )
}


function Outmoney() {

    const [data, setdata] = useState([])
    const [loading, setLoding] = useState(true)
    const loadData = () => {
        fetch("http:/192.168.1.107:3000/get", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => resp.json())
            .then(user => {
                setdata(user)
                setLoding(false)

            })
        // .catch(error => console.log(error))
    }
    useEffect(() => {
        fetch("http://192.168.1.107:3000/get", {
            method: "GET",
        })
            .then(resp => resp.json())
            .then(user => {
                setdata(user)
                setLoding(false)
            }).catch(error => console.log(error))
    }, [])
    function getRandomColor() {  //隨機顏色
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
    const Outmoneydata = [];
    let pc = 0
    if (data && data.length > 0) {
        const prices = data.map(item => item.price)//映射到新數組//支出總數
        pc = prices
    }
    let ct = ""
    if (data && data.length > 0) {
        const contents = data.map(item => item.content)//映射到新數組//支出總數
        ct = contents
    }
    for (let i = 0; i < ct.length; i++) {
        const piedata = {
            name: ct[i],
            population: pc[i],
            color: getRandomColor(),
            legendFontColor: "#FFFFFF",
            legendFontSize: 15
        };
        Outmoneydata.push(piedata)
    }
    const renderData = (item) => {
        return (
            <View>
                <View style={{ flex: 1, alignItems: "center", flexDirection: "row" }}>
                    <View style={{ flex: 1, alignItems: "flex-start", borderBottomWidth: 0.5, margin: 6 }}>
                        <Text style={{ color: "white", fontSize: 16 }}>{item.content}</Text>

                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end", borderBottomWidth: 0.5, margin: 6 }}>
                        <Text style={{ color: "white", fontSize: 16 }}>{item.price}<Foundation style={{ margintop: 10 }} name="dollar" size={20} color="#f43f5e" /></Text>
                    </View>
                </View>


            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#808080"
            }}>
                <View style={{ flex: 1 }}>
                    <PieChart
                        data={Outmoneydata}
                        width={screenWidth}
                        height={250}
                        chartConfig={chartConfig}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[10, 10]}
                        absolute
                    />
                </View>
            </View>
            <View style={{ flex: 1.3, backgroundColor: "#3f3f46" }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return renderData(item);
                    }}
                    onRefresh={() => [loadData()]}
                    refreshing={loading}
                />
            </View>
        </View>


    )
}




const Tab = createMaterialTopTabNavigator();

function Statsitic(props) {
    const insets = useSafeAreaInsets();
    // const data = props.route.params.data;
    // console.log(data);
    return (
        <View style={{ flex: 1 }}>
            <StatisticHeader />
            <Tab.Navigator
                initialRouteName="money"
                tabBarOptions={{
                    activeTintColor: '#efb810',
                    inactiveTintColor: 'black',
                    tabBarStyle: [
                        {
                            display: 'flex',
                        },
                        null,
                    ],
                    style: { backgroundColor: '#3f3f46' },
                }}
            >
                <Tab.Screen
                    name="Inmoney"
                    component={Inmoney}
                    options={{ tabBarLabel: '收入' }}
                />
                <Tab.Screen
                    name="Outmoney"
                    component={Outmoney}
                    options={{ tabBarLabel: '支出' }}
                />
            </Tab.Navigator>
        </View>
    );
}

export default function TopbarNavigator(props) {

    // const add = (data) => {
    //     console.log(data);
    // }
    // console.log(add);

    return (
        <View style={{ flex: 1 }}>
            <Statsitic />

        </View>

    )
}