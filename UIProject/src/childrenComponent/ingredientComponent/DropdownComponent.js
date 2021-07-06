import { Divider } from 'native-base';
import React, { useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesgin from 'react-native-vector-icons/AntDesign'
import * as Animatable from 'react-native-animatable';

const DropDownComponent = (props) => {
    const { onPress, iconName, iconSize, textField, formData, removeUser, stateName } = props
    return (
        <View>
            <View style={{...style.item}}>
                <TouchableOpacity 
                    style={{
                        ...style.button
                    }}
                    onPress={ onPress }  
                    >
                    <View style={{ flexDirection:"row", alignItems:"center"}}>
                        <AntDesgin  
                            name={iconName} 
                            size={iconSize} 
                            color="#2f3542" 
                        />
                        <Text style={style.iconText}>{textField}</Text>
                    </View>
                </TouchableOpacity>
                <Divider size={.8} mx={4} />
            </View>
            {
                formData[`${stateName}`] && 
                formData[`${stateName}`].map((item, index) => {
                    return(
                        <View key={index} style={ style.userView}>
                            <View style={style.userTextView}>
                                <AntDesgin  
                                    name="user"
                                    size={25} 
                                    color="#2f3542" 
                                />
                                <Text style={style.iconText}>{item.name}</Text>
                            </View>
                            <View style={style.iconView}>
                                <TouchableOpacity onPress={ () => {
                                    removeUser(index, stateName)
                                }}>
                                    <AntDesgin  
                                        name="closecircleo"
                                        size={30} 
                                        color="#e84118" 
                                    />
                                </TouchableOpacity>
                                
                            </View>
                        </View>
                    )
                })
            }
        </View>   
    )
}
export default DropDownComponent;

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
        shadowOpacity:0
    },
    userView:{ 
        flexDirection:"row", 
        alignItems:"center",
        height: 50,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 40,
        justifyContent:"space-between",
        
    },
    userTextView: { 
        flexDirection:"row", 
        flex: .8, height:"100%", 
        alignItems:"center",
        backgroundColor:"#fff",
        borderRadius: 10,
        paddingHorizontal: 20,
        borderColor:"#3498db", 
        borderWidth: 1.5
    },
    iconView: {
        flexDirection:"row", 
        flex: .2, 
        height:"100%", 
        alignItems:"center",
        justifyContent:"center"
    },
    panelHeader: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#00000040",
        marginBottom: 10 
    }
})