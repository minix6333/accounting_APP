import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, TextInput, Modal, StatusBar } from "react-native";
import { MaterialIcons, Foundation, Entypo, Fontisto, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';
import { Button, IconButton } from "react-native-paper"
import { useNavigation } from '@react-navigation/native';


const HomeScreen = (props) => {
    const [data, setdata] = useState([])
    const [loading, setLoding] = useState(true)
    const [monthdate, setMonthDate] = useState([])
    const [yeardate, setYearDate] = useState([])
    const navigation = useNavigation();

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

            }).catch(error => console.log(error))
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
    // const DataContext = createContext();
    const clickedItem = (data) => {
        props.navigation.navigate("UpdateScreen", { data: data })
    }
    const renderData = (item) => {
        return (
            <View>
                <TouchableOpacity onPress={() => clickedItem(item)} >
                    <View style={{ flex: 1, backgroundColor: "#27272a", alignItems: "center", flexDirection: "row", marginTop: 10 }}>
                        <View style={{ flex: 1, alignItems: "flex-start" }}>
                            <Text style={styles.textset}>{item.date}</Text>
                            <Text style={styles.textset_4}>{item.assets}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text style={[styles.textset]}>{item.content}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                            <Text style={styles.textset_3}>{item.income}<Foundation style={{ margintop: 10 }} name="dollar" size={20} color="#1a91ff" /></Text>
                            <Text style={styles.textset_2}>{item.price}<Foundation style={{ margintop: 10 }} name="dollar" size={20} color="#f43f5e" /></Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    let sum_price = 0
    if (data && data.length > 0) {
        const prices = data.map(item => item.price)//映射到新數組
        sum_price = prices.reduce((sum, prices) => sum + prices)//支出總數
    }
    let sum_incomes = 0
    if (data && data.length > 0) {
        const incomes = data.map(item => item.income) //映射到新數組
        sum_incomes = incomes.reduce((sum, incomes) => sum + incomes) //收入總數
    }
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    return (
        <View style={{ flex: 1, backgroundColor: "#3f3f46" }}>
            <StatusBar
                style="auto"
                barStyle="light-content"
                backgroundColor={"#3f3f46"}
            />
            <View style={{ alignItems: "center" }}>
                <Text style={styles.text} >帳單</Text>
            </View>
            <View style={{ alignItems: "flex-start" ,flexDirection:"row"}}>
                <View>
                <IconButton
                        icon={props => (
                            <MaterialIcons name="date-range" {...props} />
                        )}
                        size={15}
                        style={{ backgroundColor: "white" }}
                        onPress={() => {
                            setModalVisible(true);
                        }}
                    />
                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(false);
                        }}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.innerContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="輸入年"
                                    keyboardType="numeric"
                                    placeholderTextColor="white"
                                    onChangeText={(value1) => setYearDate(value1)}
                                />

                                <View style={styles.buttonContainer}>
                                    <Button
                                        title="Cancel"
                                        onPress={() => {
                                            setModalVisible(false);
                                        }}
                                    >
                                        <Text style={{ color: "#f43f5e" }}>取消</Text>
                                    </Button>
                                    <Button
                                        title="OK"
                                        onPress={() => {
                                            setModalVisible(false);
                                            fetch(`http://192.168.1.107:3000/gy/${yeardate}`, {
                                                method: "GET",
                                            })
                                                .then(resp => resp.json())
                                                .then(result => {
                                                    setdata(result);
                                                    setModalVisible(false);
                                                })
                                                .catch(error => console.log(error));
                                        }}
                                    >
                                        <Text style={{ color: "#1a91ff" }}>確認</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View >
                    <IconButton
                        icon={props => (
                            <Fontisto name="date" {...props} />
                        )}
                        size={15}
                        style={{ backgroundColor: "white" }}
                        onPress={() => {
                            setModalVisible2(true);
                        }}
                    />
                    <Modal
                        transparent={true}
                        visible={modalVisible2}
                        onRequestClose={() => {
                            setModalVisible2(false);
                        }}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.innerContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="輸入月"
                                    keyboardType="numeric"
                                    placeholderTextColor="white"
                                    onChangeText={(value) => setMonthDate(value)}
                                />

                                <View style={styles.buttonContainer}>
                                    <Button
                                        title="Cancel"
                                        onPress={() => {
                                            setModalVisible2(false);
                                        }}
                                    >
                                        <Text style={{ color: "#f43f5e" }}>取消</Text>
                                    </Button>
                                    <Button
                                        title="OK"
                                        onPress={() => {
                                            setModalVisible2(false);
                                            fetch(`http://192.168.1.107:3000/gm/${monthdate}`, {
                                                method: "GET",
                                            })
                                                .then(resp => resp.json())
                                                .then(result => {
                                                    setdata(result);
                                                    setModalVisible2(false);
                                                })
                                                .catch(error => console.log(error));
                                        }}
                                    >
                                        <Text style={{ color: "#1a91ff" }}>確認</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>

            </View>
            <View >
                <View style={{ alignItems: "center", flexDirection: "row", borderBottomWidth: 1, borderTopWidth: 1, borderColor: "#6b7280" }}>
                    <View style={{ flex: 1, alignItems: "flex-start", marginLeft: 30 }}>
                        <Text style={{ color: "white", fontSize: 17 }}>收入</Text>
                        <Text style={styles.textset_3}>{sum_incomes}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 17 }}>支出</Text>
                        <Text style={styles.textset_2}>{sum_price}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end", marginRight: 30 }}>
                        <Text style={{ color: "white", fontSize: 17 }}>總額</Text>
                        <Text style={styles.textset}>{sum_incomes - sum_price}</Text>
                    </View>
                </View>
            </View>

            <View >
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return renderData(item);
                    }}
                    onRefresh={() => [loadData()]}
                    refreshing={loading}
                    style={{height:530}}
                // keyExtractor = {item => ${item.id} }
                />
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('AddScreen')}
                    style={{ padding: 5, margin: 5 }}
                    activeOpacity={0.6}>
                    <Ionicons name="ios-add-circle" size={60} color="#f43f5e" />
                </TouchableOpacity>
            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: "white",
    },
    textset: {
        color: "white",
        fontSize: 18
    },
    textset_2: {
        color: "#f43f5e",
        fontSize: 18
    },
    textset_3: {
        color: "#1a91ff",
        fontSize: 18
    },
    textset_4: {
        color: "#a1a1aa",
        fontSize: 15
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    innerContainer: {
        width: 300,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3f3f46',
    },
    textInput: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        color: "white"
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },


})

export default HomeScreen;