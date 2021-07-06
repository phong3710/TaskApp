import React, { useState, useRef, useEffect} from 'react';
import {  ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Divider } from 'native-base';
import { TextArea } from 'native-base';

const TextAreaComponent = (props) => {
    const {stateName, onChangeTextArea, index, textField, placeholder} = props
    return(
        <View style={{ paddingHorizontal: 30}}>
            <View style={ style.container }>
                <View>
                    <Text style={ style.iconText }>{textField}</Text>
                    <TextArea h={50}  placeholder={placeholder} onChangeText={(value) => onChangeTextArea(value, stateName)} />
                </View>
            </View>
        </View>
    )
}
export default TextAreaComponent
const style = StyleSheet.create({
    container : {
        marginVertical: 20
    },
    iconText: {
        paddingLeft:10,
        fontSize:16, 
        color:"#2f3542",
        fontWeight:"900",
        marginVertical: 10
    },
    itemView: {
        flexDirection:"row",
        alignItems:"center",
    }
})