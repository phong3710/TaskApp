import React, { useState, useEffect} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    fetchTasksRequest,
    fetchTasksFailed,
    fetchTasksSuccess
} from '../../action/tasksAction'
import { Text, Item, Button } from 'native-base';
import { Image, SafeAreaView, StyleSheet, ActivityIndicator, View, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesgin from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../childrenComponent/Loading';
import { useIsFocused  } from '@react-navigation/native';


const Tasks = ({navigation}) => {
    const tasks = useSelector(state => state.tasksReducer)
    const dispatch = useDispatch()
    const [currentTab, setCurrentTab] = useState("")
    const [loading, setloading] = useState(false)
    const isFocused = useIsFocused();
   
    useEffect(
        async () => {
            const AccountId =  await AsyncStorage.getItem("@uId")
            const CompanyCode =  await AsyncStorage.getItem("@CompanyCode")
            const token =  await AsyncStorage.getItem("@token")
            const key =  await AsyncStorage.getItem("@key")
            if(isFocused === true){
                setloading(true)
                dispatch(fetchTasksRequest)
                await axios.get(`https://icrm-product-api-v2.isdcorp.vn/Auth/GetKanbanMenu`,{
                    headers: {
                        "Accept": 'application/json',
                        'Content-Type': 'application/json',
                    },
                    params: {
                        AccountId: AccountId,
                        CurrentCompanyCode: CompanyCode,
                        token: token,
                        key: key
                    }
                }).then( response => {
                    var data = response.data
                    dispatch( fetchTasksSuccess(data))
                    setloading(false)
                })
                .catch((err) => {
                    var errMsg = err.Message
                    Alert.alert("Thông báo", "Tải dữ liệu thất bại...")
                    setloading(false)
                    dispatch(fetchTasksFailed(errMsg))
                })
            }
        },
        
        [isFocused]
    )

    const iconType = (iconType, iconName) => {
        switch (iconType) {
            case "Feather": 
                return <Feather name={iconName} color="black" size={25} />
            case "MaterialCommunityIcons":
                return <MaterialCommunityIcons name={iconName} color="black" size={25} />
            case "FontAwesome":
                return <FontAwesome name={iconName} color="black" size={25} />
            case "MaterialIcons":
                return <MaterialIcons name={iconName} color="black" size={25} />
            default:
                return <AntDesgin name="frowno" color="black" size={25}/>
        }

    }
    
    const taskItem = tasks.tasks.length !== 0 && tasks.tasks.Data ? 
        tasks.tasks.Data.map((item, index) => {
        if( item.Visible === true){
            return(
                <View style={{...style.item}} key={index}>
                    <Button 
                        style={{
                            ...style.button,
                            paddingLeft: 15,
                            backgroundColor: currentTab === item.MenuName ? "#54a0ff" : "white"
                        }}
                        onPress = {() => {
                            navigation.navigate("AssignedTaskTab"),
                            setCurrentTab(item.MenuName)
                            
                        }}  
                        >
                        <View style={{ flexDirection:"row", alignItems:"center", paddingLeft: 30}}>
                            {iconType(item.IconType, item.IconName)}
                            <Text style={style.iconText}>{item.MenuName}</Text>
                        </View>
                    </Button>   
                </View>
            ) 
        } else{
            return <View key={index}/>
        }
    }): null
    return(
        <SafeAreaView style={style.safeView}>
            <View style={ style.view }>
                <Image style={style.avatar} source={require('../../assets/avatar.png')}/>
                <View style={{ 
                    flexDirection:"row", 
                    justifyContent:"space-between", 
                    paddingHorizontal:20, 
                    alignContent:"center", 
                    flex:1
                }}>
                    <Text style={{ fontWeight:"bold", fontSize:20}}>Công việc</Text>
                    <TouchableOpacity onPress = { () => navigation.navigate('EventDrawer')}>
                        <AntDesgin name="addfile" color="black" size={22}/>
                    </TouchableOpacity>
                </View>
            </View>

        {tasks.loading === false && 
            <View style={{ width:"100%", marginTop: 20}}>
                {taskItem}
            </View>
        }
            <Loading loading={loading}/>
        </SafeAreaView>
    )
}
export default Tasks;
const style = StyleSheet.create({
    safeView: {
        width:"100%",
        backgroundColor:"#fff",
        flex:1,
        alignItems:"flex-start",
        justifyContent:"flex-start",
        paddingTop:20,
    },
    avatar: {
        width: 50,
        height: 50,
    },
    view:{
        width: "100%",
        flexDirection:"row", 
        alignItems:"center",
        paddingLeft: 30,
    },
    
    item:{
        width: "100%",
        height:55,
        elevation: 0, 
        shadowOpacity:0,        
    },
    iconText: {
        paddingLeft:30,
         fontSize:15, 
         color:"black"
    },
    button: {
        backgroundColor:"#fff",
        width:"100%",
        height:"100%",
        flexDirection:"row",
        justifyContent:"space-between", 
        elevation: 0, 
        shadowOpacity:0,
        // borderTopRightRadius: 10,
        // borderBottomRightRadius: 10
    },
})
