import React, { useState, useRef, useEffect} from 'react';
import {  ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Divider } from 'native-base';

const RadioButtonComponent = () => {
    const [checked, setChecked] = useState('first');

  return (
    <View style={{ paddingLeft: 20, paddingRight: 40}}>
        <View style={ style.container }>
            <View style={style.itemView} >
                <RadioButton
                value="first"
                status={ checked === 'first' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('first')}
                />
                <Text style={style.iconText} >Cá nhân</Text>
            </View>
        
        <View style={style.itemView}>
            <RadioButton
                value="second"
                status={ checked === 'second' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('second')}
            />
            <Text style={style.iconText} >Tập thể</Text>
        </View>
        </View>
        <Divider size={.8} mx={4} />
    </View>
  );
}
export default RadioButtonComponent
const style = StyleSheet.create({
    container : {
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal: 10
    },
    iconText: {
        paddingLeft:20,
        fontSize:16, 
        color:"#2f3542",
        fontWeight:"900",
    },
    itemView: {
        flexDirection:"row",
        alignItems:"center",
        height:55
    }
})