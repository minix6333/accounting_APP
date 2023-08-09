import React from "react";
import {View , Text ,StatusBar ,StyleSheet} from "react-native";
import {FontAwesome5,Ionicons} from "react-native-vector-icons";
import { useNavigation } from '@react-navigation/native';

function AssetsHeader ()  {
    const navigation = useNavigation(); 
    return ( 
        <View style={{backgroundColor:"red", height:40}}>
            <StatusBar
                style="auto"
                barStyle="light-content"
                backgroundColor={"#3f3f46"}
            />
            <View style={{backgroundColor:"#3f3f46" ,flex:1,alignItems:"center",justifyContent:"center", flexDirection:"row"}}>
                <View style={{flex:1}}></View>
                <View  style={{flex:1,alignItems:"center"}}>
                    <Text style={{fontSize:20,color:"white"}}>資產</Text>
                </View>   
                <View  style={{flex:1,alignItems:"center",flexDirection:"row", justifyContent:"flex-end"}}> 
                    <FontAwesome5.Button
                        name="edit"
                        backgroundColor="#3f3f46"
                        size={15}
                     
                    ></FontAwesome5.Button>
                    <Ionicons.Button 
                        onPress={() =>navigation.navigate('AssetsAdd')}
                        name="add"
                        backgroundColor="#3f3f46"
                        size={25}
                    ></Ionicons.Button >
                </View>
            </View>
        </View> 
        
     );
}
export default AssetsHeader;

const styles = StyleSheet.create({
    text:{
        fontSize:16,
        color:"white"
        
    }
})
