import { Text, Item, Button } from 'native-base';
import React, { useState, useEffect, useContext} from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesgin from 'react-native-vector-icons/AntDesign'
import FontAwsome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../service/AuthContext';


const SlideMenu = ( {navigation, route} )=> {
    const {logOut} = useContext(AuthContext)
    const [currentTab, setCurrentTab] = useState("Lịch")
    const [userName, setuserName] = useState("")
    useEffect(async () => {
        let userNameStorage = await AsyncStorage.getItem('@userName')
        if(userNameStorage !== null)
            setuserName(userNameStorage)
            return () => {
                userNameStorage == null
            }
    }, [ AsyncStorage.getItem('@userName')])
    const tabButton = (currentTab, setCurrentTab, tittle, icon, screen) => {
        return(
            <View style={{...style.item}}>
                <Button 
                    style={{
                        ...style.button, 
                        backgroundColor: currentTab === tittle ? "#54a0ff" : "transparent"
                    }}
                    onPress = {() => {
                        setCurrentTab(tittle),
                        screen ? navigation.navigate(screen) : null
                    }} 
                    >
                    <View style={{ flexDirection:"row", alignItems:"center", paddingLeft: 20}}>
                        <AntDesgin  
                            name={icon} 
                            size={22} 
                            color="#fff" 
                        />
                            <Text style={style.iconText}>{tittle}</Text>
                    </View>
                </Button>
            </View>
        )
    }
    return (
        <SafeAreaView style={style.safeView}>
            <View style={ style.view }>
                <Image style={style.avatar} source={require('../assets/avatar.png')}/>
                <View style={{ flexDirection:"row", justifyContent:"space-between", paddingLeft:20 }}>
                    <Text style={{ color:"#fff", fontSize: 15, fontWeight:"bold"}} >{userName}</Text>
                    
                </View>
            </View>
            
            <View style={{...style.item}}>
                <Button 
                    style={{
                        ...style.button
                    }} 
                    >
                    <View style={{ flexDirection:"row", alignItems:"center", paddingLeft: 20}}>
                        <FontAwsome name="check" color="#2ecc71" size={22}/>
                        <Text style={style.iconText}>Trạng thái</Text>
                    </View>
                </Button>
            </View>

            {tabButton(currentTab, setCurrentTab, "Khách hàng", "team")}
            {tabButton(currentTab, setCurrentTab, "Giao việc", "addfile", "EventDrawer")}
            {tabButton(currentTab, setCurrentTab, "Công việc", "table", "TaskStack")}
            {tabButton(currentTab, setCurrentTab, "Báo cáo", "profile", "ReportStack")}
            {tabButton(currentTab, setCurrentTab, "Chat", "message1", "ChatStack")}
            
            <View style={{...style.item}}>
                <Button 
                    style={{
                        ...style.button
                    }} 
                    onPress = {()=> {
                        AsyncStorage.clear(),
                        logOut()
                    }}
                    >
                    <View style={{ flexDirection:"row", alignItems:"center", paddingLeft: 20}}>
                        <Ionicons name="exit-outline" color="#fff" size={22}/>
                        <Text style={style.iconText}>Đăng xuất</Text>
                    </View>
                </Button>
            </View>

        </SafeAreaView>
    )
}
export default SlideMenu;

const style = StyleSheet.create({
    safeView: {
        backgroundColor:"transparent",
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
        paddingLeft: 20,
        marginBottom: 10
    },
    
    item:{
        height:55,
        elevation: 0, 
        shadowOpacity:0,
        width:"90%",
        
    },
    iconText: {
        paddingLeft:30,
         fontSize:15, 
         color:"#fff",
         fontWeight:"900"
    },
    button: {
        backgroundColor:"transparent",
        width:"100%",
        height:"100%",
        flexDirection:"row",
        justifyContent:"space-between", 
        elevation: 0, 
        shadowOpacity:0,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50
    },
})