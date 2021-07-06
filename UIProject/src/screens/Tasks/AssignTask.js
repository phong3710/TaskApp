import React, { useEffect, useState } from 'react';
import { Text } from 'native-base';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesgin from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import Loading from '../../childrenComponent/Loading';
import { useIsFocused  } from '@react-navigation/native';


const AssignedTask = ({navigation}) => {
    const [loading, setloading] = useState(false)

    useEffect(() => {
        console.log('loading state')
    }, [])

    const renderItem = ()=>{
        return(
            <View style={ style.itemContainer } >
                <View style={ style.iconView }>
                    <FontAwesome5 name="tasks" size={22} color="#2f3542"/>
                </View>
                <View style={ style.item }>
                    <View style={ style.itemChild1}>
                        <Text style={{...style.text, 
                            fontWeight: "bold",
                            fontSize:15
                        }}>ADMIN</Text>
                    </View>
                    <View style={ style.itemChild2 }>
                        <View style={{ justifyContent:"center", alignItems:"flex-start"}}>
                            <Text style={ style.text} >Mã Task: 001</Text>
                            <Text style={ style.text}>Ngày bắt đầu: 24/06/2021 </Text>
                        </View>
                      
                    </View>
                </View>
                <View  style={{ flex: .2, justifyContent:"center", alignItems:"center"}}>
                    <Ionicons name="checkmark-circle" size={22} color="#9c88ff"/>
                    <Text style={{...style.text}}>Đã vào</Text>
                </View>
            </View>
        )
    }
    return (
        <ScrollView>
            <View style={style.container}>
                <View style={{ marginVertical: 30,}}>
                    {renderItem()}
                    {renderItem()}
                    {renderItem()}
                    {renderItem()}
                    {renderItem()}
                    {renderItem()}
                    {renderItem()}
                    {renderItem()}
                    {renderItem()}
                </View>
            </View> 
        </ScrollView>

    )
}
export default AssignedTask;
const style = StyleSheet.create({
    container: {
       flex: 1,
       height:"100%",
       alignItems:"center",
       backgroundColor:"#fff"
    },
    header:{
        height:70,
        elevation: 0, 
        shadowOpacity:0,
        paddingLeft:20,
        paddingRight:20,
        width:"100%",
        marginBottom:20, 
        borderColor:"#fff",
        alignItems:"center"
        
    },
    itemContainer: {
        backgroundColor:"#f5f6fa",
        flexDirection:"row",
        width: "90%",
        paddingVertical: 10,
        height: 100,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: '#fff',
        shadowOpacity: .8,
        borderColor:"#fff",
        elevation: 2,
    }, 
    iconView: {
        flex: .2,
        alignItems:"center", 
        justifyContent:"center",
        flexDirection:"row",
    }, 
    item: {
        flexDirection:"column",
        flex: .6
    }, 
    itemChild1: {
        justifyContent:"center",
        alignItems:"flex-start",
        flex: .5,
        borderBottomWidth: .5,
        borderColor: "#7f8fa6",
    }, 
    itemChild2: {
        flexDirection:"row",
        flex:.5,
        paddingVertical: 10,
    },
    text: {
        color: "#2f3542",
        fontSize: 14,
        fontWeight:"900"
    }
})