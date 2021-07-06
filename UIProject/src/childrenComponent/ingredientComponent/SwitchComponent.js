import React from 'react';
import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesgin from 'react-native-vector-icons/AntDesign'
import { Switch } from 'react-native-switch';
import { Divider } from 'native-base';


const SwitchComponent = (props) => {
    return (
        <View style={{...style.item}}>
            <TouchableOpacity
                disabled 
                style={{
                    ...style.button
                }} 
            >
                <View style={{ flexDirection:"row"}}>
                    <AntDesgin  
                        name={props.iconName} 
                        size={props.iconSize} 
                        color="#2f3542" 
                    />
                     <Text style={style.iconText}>{props.textField}</Text>
                </View>
                <Switch
                    outerCircleStyle={{paddingLeft:10}}
                    value={props.value}                    
                    onValueChange={(value) => props.onValueChange(value, props.stateName)}
                    activeText={""}
                    inActiveText={'○'}
                    circleSize={32}
                    barHeight={32}
                    switchLeftPx={3}
                    switchRightPx={3}
                    switchWidthMultiplier={1.7}
                    switchBorderRadius={50}
                    backgroundActive={'#6264A7'}
                    backgroundInactive={'#bfc5c9'}   
                />
            </TouchableOpacity>
            <Divider size={.8} mx={4} />
        </View>
    )
}
export default SwitchComponent;
const style = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        justifyContent:"flex-start",
        backgroundColor:"#fff",
    
    },

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
        flexDirection:"row",
        justifyContent:"space-between", 
        backgroundColor:"#fff", 
        elevation: 0, 
        shadowOpacity:0,
        alignItems:"center"
    }
})