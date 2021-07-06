import React, {useCallback} from 'react';
import {Platform, StyleSheet, Alert, View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Header = ( props ) =>{
    return(
    <SafeAreaView style={{ flex: 0.1, backgroundColor:"#fff"}}>
        <TouchableOpacity 
        onPress={ props.openBurgerMenu }
        style={{ paddingHorizontal: 20, marginTop:20}}
        >
          <FontAwesome5 name="bars" size={30} color="#161924" />
        </TouchableOpacity>
    </SafeAreaView>
    )
} 
export default Header;
    