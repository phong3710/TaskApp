import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import LottieView from 'lottie-react-native';

const PlashScreen = ({loading}) => {

    if(!loading){
        return <View/>
    }
    return (
        <View style={ style.overlay }>
                <LottieView source={require('../assets/loading.json')} autoPlay loop/>
        </View>
    )
}
export default PlashScreen;

const style = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0, 0, 0, 0)',
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