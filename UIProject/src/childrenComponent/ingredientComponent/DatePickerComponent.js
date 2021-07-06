import React, { useState, useRef, useEffect} from 'react';
import {  ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { Divider } from 'native-base';
import DatePicker from 'react-native-date-picker'
import { format } from 'date-fns';

const DatePickerComponent = (props) => {
    const { textField, dateStart, onChangeDatePicker, stateName } = props
    const [open, setOpen] = useState(false)

    const openDatePicker = () => {
        setOpen(!open)
    }

    return (
        <>
            <View style={{...style.item}}>
                <TouchableOpacity
                    style={ style.button} 
                    onPress={ openDatePicker }
                >
                    <View style={{ flexDirection:"row", justifyContent:"space-between"}}>
                        <Text  style={style.iconText}>
                            {textField}
                        </Text>
                        <Text style={{...style.iconText}}>
                            {format(dateStart, 'HH')}:{format(dateStart, 'mm')}, {format(dateStart, 'dd')}  
                        <Text style={{...style.iconText}}> thg </Text> 
                            {format(dateStart, 'MM')}
                        </Text>
                    </View>
                    
                </TouchableOpacity>
                <Divider size={.8} mx={4} />

            </View>
            { open && (
                 <View >
                    <View style={{ justifyContent:'center', alignItems:"center"}} >
                        <DatePicker
                            locale={"vi-VN"}
                            fadeToColor="none"
                            date={dateStart}
                            onDateChange={(date) => onChangeDatePicker(date, stateName )}
                            minuteInterval={5}
                        />
                    </View>
                 </View>   
            )}
        </>
    )
}
export default DatePickerComponent;
const style = StyleSheet.create({
    item:{
        height:55,
        backgroundColor:"#fff",
        elevation: 0, 
        shadowOpacity:0,
        paddingLeft:20,
        paddingRight:40,
        marginVertical: 10
        
    },
    iconText: {
        paddingLeft:20,
         fontSize:16, 
         color:"#2f3542",
         fontWeight:"900",
    },
    button: {
        width:"100%",
        height:"100%",
        backgroundColor:"#fff",
        justifyContent:"center", 
        elevation: 0, 
        shadowOpacity:0,
    }
})
