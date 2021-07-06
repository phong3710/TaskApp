import React, { useState, useRef, useEffect} from 'react';
import {  ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Divider, useColorModeValue, Input } from 'native-base';

const TextInputComponent = ( {placeholder, textField, onChangeTextInput, stateName} ) => {
    return (
        <View style={style.item}>
            <Text style={style.iconText}>{textField}</Text>
            <Input
                onChangeText={(value) => onChangeTextInput(value, stateName)}
                variant="outline"
                w="100%"
                mx={3}
                placeholder={placeholder}
                placeholderTextColor={useColorModeValue("blueGray.400", "blueGray.50")}
            />
        </View>
    )
}
export default TextInputComponent;
const style = StyleSheet.create({
    item:{
        height:55,
        backgroundColor:"#fff",
        elevation: 0, 
        shadowOpacity:0,
        paddingLeft:20,
        paddingRight:40,
        justifyContent:"space-between",
        marginVertical: 20
        
    },
    iconText: {
        paddingLeft:20,
         fontSize:15, 
         color:"#2f3542",
         fontWeight:"900",
         marginVertical: 10
    },
    button: {
        width:"100%",
        height:"100%",
        flexDirection:"row",
        justifyContent:"space-between", 
        backgroundColor:"#fff", 
        elevation: 0, 
        shadowOpacity:0
    },
    headerBottomSheet: {
        backgroundColor:"rgba(0, 0, 0, 0.8)",
        paddingTop: 20,
        height: 200
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20
    },
    panelHeader: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#00000040",
        marginBottom: 10 
    }
})