import React , {useState , useEffect}from "react";
import {View,Text,StyleSheet,FlatList,ScrollView,TouchableOpacity} from "react-native";
import AssetsHeader from "./AssetsHeader.js";
import { Foundation } from 'react-native-vector-icons';

function Assets(props){
  const [data,setdata] = useState([])
  const [loading,setLoding] =useState(true)
  const loadData = () =>{
      fetch("http://192.168.1.107:3000/get" , {
          method:"GET",
          headers:{
              "Content-Type": "application/json"
          }
      })
      .then(resp => resp.json())
      .then(user => {
          setdata(user)
          setLoding(false)
      //    console.log(user);
      })
      .catch(error=>console.log(error))
  }


  useEffect(() => {
    fetch("http://192.168.1.107:3000/get" , {
        method:"GET",
    })
    .then(resp => resp.json())
    .then(user => {
        setdata(user)
        setLoding(false)
    })},[])
    const Itemtext=(item)=>{
      
      if(item.price==0 && item.income==0){
        return(
          <View style={{flex:1,alignItems:'flex-end'}}>
              <Text style={[assets.text,{color:'#9D9D9D'}]}>$ 0</Text>
          </View>)
      }
      if (item.price==0) {
        return(
          <View style={{flex:1,alignItems:'flex-end'}}>
              <Text style={[assets.text,{color:'#1a91ff'}]}>$ {item.income}</Text>
          </View>)
      }
      if(item.income==0){
        return(
          <View style={{flex:1,alignItems:'flex-end'}}>
              <Text style={[assets.text,{color:'#f43f5e'}]}>$ {item.price}</Text>
          </View>
        )
      }
      
    }
    const renderData = (item) => {
          return( 
          <View>
            <View  style={{flex:1,flexDirection:'row',borderBottomWidth:1,alignItems:'center',backgroundColor:'#3f3f46',borderColor:'gray',height:35,paddingLeft:20,paddingRight:20}}>
                <View style={{flex:1,alignItems:'flex-start'}}>
                    <Text style={[assets.text,{color:'#9D9D9D'}]}>{item.content}</Text>
                </View>
                <Itemtext price={item.price} income={item.income}></Itemtext>
            </View>
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



    return (
        <View style={{flex:1}}>
            <AssetsHeader/>
            <View style={assets.content}>
                <View style={{flexDirection:'column', alignItems: 'flex-start'}}>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-start',flexDirection:'row',borderTopColor:"gray",borderTopWidth:1 }}>
                        <View style={{flex:1,alignItems:"center"}}>
                            <Text style={assets.text}>資產</Text>
                            <Text style={assets.text}>{sum_incomes}</Text>
                        </View>
                        <View style={{flex:1,alignItems:"center"}}>
                            <Text style={assets.text}>負債</Text>
                            <Text style={assets.text}>{sum_price}</Text>
                        </View>
                        <View style={{flex:1,alignItems:"center"}}>
                            <Text style={assets.text}>總額</Text>
                            <Text style={assets.text}>{sum_incomes-sum_price}</Text>
                        </View>   
                    </View> 
                    <View style={{flexDirection:'row',borderTopColor:"gray",borderTopWidth:1,paddingLeft:10,paddingRight:20 }}>
                        <View style={{flex:1,alignItems:'flex-start',height:35,justifyContent:'center'}}>
                            <Text style={{color:"white"}}>錢包</Text>
                        </View>
                    </View>
                    <View style={[assets.view1,{justifyContent:'flex-start'}]}>
                        <FlatList
                            data = {data}
                            renderItem = {({item}) => {
                                if (item.assets=='錢包') {
                                  return renderData(item)
                                } 
                            }}
                            onRefresh = {() =>[loadData()]}
                            refreshing = {loading}
                        />
                    </View> 
                    <View style={{flexDirection:'row',borderBottomColor:"gray",borderBottomWidth:1,paddingLeft:10,paddingRight:20 }}>
                        <View style={{flex:1,alignItems:'flex-start',height:35,justifyContent:'center'}}>
                            <Text style={{color:"white"}}>銀行</Text>
                        </View>
                    </View>
                    <View style={[assets.view1,{justifyContent:'flex-start'}]}>
                        <FlatList
                            data = {data}
                            renderItem = {({item}) => {
                                if (item.assets=='銀行') {
                                  return renderData(item)
                                } 
                            }}
                            onRefresh = {() =>[loadData()]}
                            refreshing = {loading}
                        />
                    </View> 
                </View>  
            </View>
        </View>
      ); 
}
export default Assets;  
const assets =StyleSheet.create({
  content:{
    flex:1,
    backgroundColor:"#3f3f46",
    alignItems: 'flex-start',
  },
  view1:{
    justifyContent: 'flex-end',flexDirection:'row',borderTopColor:"gray",borderTopWidth:1 ,backgroundColor:"#434743"
  },
  view2:{
    flex:1, alignItems: 'flex-start',margin:10
  },
  text:{
    fontSize:14,color:"#fff"
  }
})
