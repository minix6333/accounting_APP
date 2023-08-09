import React from "react";
import {View,Text,StyleSheet,TouchableOpacity} from "react-native"
import SettingHeader from "./SettingHeader.js";
import { FontAwesome, Foundation, Entypo, Feather, Ionicons } from 'react-native-vector-icons';

function SettingsScreen() {
    return (
      <View style={{flex:1, backgroundColor:"#3f3f46"}}>
        <SettingHeader/>
        <View style={{flex:1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <View style={styles.text_header}>
            <Text style={{color:"#a1a1aa",fontSize:15}}>一般設定</Text>
          </View>
          <TouchableOpacity><Text style={styles.text}>Settings!</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.text}>Settings!</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.text}>Settings!</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.text}>Settings!</Text></TouchableOpacity>
          <View style={styles.text_header}>
            <Text style={{color:"#a1a1aa",fontSize:15}}>帳戶設定</Text>
          </View>
          <TouchableOpacity><Text style={styles.text}>Settings!</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.text}>Settings!</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.text}>Settings!</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.text}>Settings!</Text></TouchableOpacity>
        </View>
         
      </View>

    );
  }
export default SettingsScreen;
const styles = StyleSheet.create({
  text:{
    fontSize:20,
    color: 'white',
    paddingLeft:20,
    paddingTop:10,
  },
  text_header:{
    backgroundColor:"#27272a",
    padding:10,
    alignSelf:"stretch",
    fontSize:15,
    marginTop:10
  }

})