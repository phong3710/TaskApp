import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import ExpandCalendar from "../../screens/ExpendScreen";
import EventDrawer from "../drawer/EventDrawer";
import { Animated } from "react-native";
import { createDrawerNavigator, useIsDrawerOpen } from '@react-navigation/drawer';

const Stack = createStackNavigator();

const HomeStack = ({style, onOpenDrawer, _progress}) => {
    const open = useIsDrawerOpen()
    useEffect(() => {
        if (open === false){
            Animated.timing(_progress, {
                toValue: 0,
                duration: 200,
                isInteraction: true, 
                useNativeDriver: true
            }).start()
        }
       
    }, [open])

    return (
        <Animated.View style={{...style ,flex: 1}}>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name = "ExpendCalendar">
                    {props => <ExpandCalendar {...props} onOpenDrawer = {onOpenDrawer}/>}
                </Stack.Screen>
                <Stack.Screen name="EventDrawer" component={EventDrawer}/>
            </Stack.Navigator>
        </Animated.View>
    )
}
export default HomeStack