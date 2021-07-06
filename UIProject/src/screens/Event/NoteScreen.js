import React, { useState, useEffect} from 'react';
import { Animated, StyleSheet, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import { Text, Button, Item, Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const size = 22;
const {width, height} = Dimensions.get("screen");

const NoteScreen = ({navigation}) => {
    const [text, setText] = useState("")

   
    return (
        <View style={style.container}>
            <Item style={{...style.item, justifyContent:"center"}}>
                <TouchableOpacity 
                style={{
                    position:"absolute",
                    left: 20
                }}
                onPress={() => navigation.navigate('Event', {
                    text: text
                })}
                >
                    <Ionicons 
                        name="chevron-back-outline" 
                        size={size} 
                        color="#bfc5c9" 
                    />
                </TouchableOpacity>
                
                <Text style={{fontWeight:"bold", fontSize:16}}>Ghi chú</Text>

                
            </Item>
            
            <View style={{ height: height / 3 , marginHorizontal:20, marginVertical: 20}}>
                <TextInput
                    multiline={true}
                    numberOfLines={20}
                    style={{  borderColor:"black", borderWidth: .5, textAlignVertical:"top"}}
                    value={text}
                    onChangeText = { (text) => {setText(text)} }
                />
            </View>  
            
        </View>
    )
}
export default NoteScreen
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
        paddingLeft:10,
        paddingRight:10
        
    },
})