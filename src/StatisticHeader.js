import React from "react";
import {View , Text ,StatusBar ,StyleSheet, Alert,} from "react-native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

function StatisticHeader() {
    return ( 
        <View style={{backgroundColor:"red", height:40}}>
            <StatusBar
                style="auto"
                barStyle="light-content"
                backgroundColor={"#3f3f46"}
            />
            <View style={{backgroundColor:"#3f3f46" ,flex:1,alignItems:"center",justifyContent:"center", flexDirection:"row"}}>
                <Text style={styles.text}>統計</Text>
            </View>
        </View>
     );
}
export default StatisticHeader;


const styles = StyleSheet.create({
    text:{
        fontSize:16,
        color:"white"
    }
})

