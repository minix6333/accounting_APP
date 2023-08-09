import React from 'react';
import { Button, Text, View, StyleSheet, StatusBar, Navigator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen.js';
import SettingsScreen from './src/SettingScreen.js';
import Statsitic from './src/StatisticScreen.js';
import assets from './src/AssetsScreen.js';
import AddScreen from './src/AddScreen.js';
import UpdateScreen from './src/UpdateScreen.js';
import AssetsAdd from "./src/AssetsAdd.js"
import { FontAwesome, Foundation, Entypo, Feather, Ionicons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ScreenTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#404040',
                    paddingBottom: 5,
                    paddingTop: 5,

                },
                tabBarActiveTintColor: '#FFF',
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Home',
                    headerStyle: { backgroundColor: '#d8b4fe' },
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesome name='home' color={color} size={size} />
                    )
                }}
            >
            </Tab.Screen>
            <Tab.Screen
                name="Statsitic"
                component={Statsitic}
                options={{
                    title: '統計 ',
                    headerStyle: { backgroundColor: '#d8b4fe' },
                    tabBarIcon: ({ color, size }) => (
                        <Foundation name='graph-pie' color={color} size={size} />
                    )
                }}
            />

            <Tab.Screen
                name="資產"
                component={assets}
                options={{
                    title: '資產 ',
                    headerStyle: { backgroundColor: '#d8b4fe' },
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name='database' color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="設定"
                component={SettingsScreen}
                options={{
                    title: '設定 ',
                    headerStyle: { backgroundColor: '#d8b4fe' },
                    tabBarIcon: ({ color, size }) => (
                        <Feather name='more-horizontal' color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}
function ScreenStack() {
    return (
        <Stack.Navigator initialRouteName='home'>
            <Stack.Screen
                name="home"
                component={ScreenTab}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="AddScreen"
                component={AddScreen}
                options={{
                    headerStyle: {
                        backgroundColor: '#3f3f46',
                    }
                }}
            />
            <Stack.Screen
                name="UpdateScreen"
                component={UpdateScreen}
                options={{
                    headerStyle: {
                        backgroundColor: '#3f3f46',
                    }
                }}
            />
            <Stack.Screen
                name="AssetsAdd"
                component={AssetsAdd}
                options={{
                    headerStyle: {
                        backgroundColor: '#404040',
                    }
                }}
            />
        </Stack.Navigator>

    )
}

export default function App() {
    return (
        <NavigationContainer>
            <ScreenStack />
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    newButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#94a3b8',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
});


