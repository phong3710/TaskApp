import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Text } from 'react-native-elements'

const Loading = ({loading}) => {

    if(!loading){
        return <View/>
    }
    return (
        <View style={ style.overlay }>
            <View style={ style.container }>
                <ActivityIndicator color="red" size="small"/>
                <Text style={style.text}>Loading...</Text>
            </View>
        </View>
    )
}
export default Loading;

const style = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        alignItems: "center",
        justifyContent:"center"
    },
    container: {
        justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"white", 
        padding:20,
        width:"40%",
        borderRadius:8,
    },
    text:{
        marginLeft:10,
        fontWeight: "500"
    }
})