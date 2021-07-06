import React from 'react';
import { Text, Item } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabBar = ({ state, descriptors, navigation, position }) => {
     
      return (
        <View style={{...style.container}}>

            <View style={{...style.header, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                        <TouchableOpacity onPress={() => navigation.goBack() }>
                            <Ionicons name="chevron-back-outline" size={30} color="#2f3542"/>
                        </TouchableOpacity>
                        <Text style={{fontWeight:"bold", fontSize:18}}>Công việc được phân công</Text>
                        <TouchableOpacity>
                            <Ionicons name="filter-outline" size={30} color="#2f3542"/>
                        </TouchableOpacity>  
            </View>
        </View>

        );
}
export default TabBar;
const style = StyleSheet.create({
    container: {
       flexDirection:"column",
    },
    header:{
        backgroundColor:"#fff",
        height:70,
        elevation: 0, 
        shadowOpacity:0,
        paddingLeft:20,
        paddingRight:20,
        width:"100%",
        alignItems:"center"
    }
})