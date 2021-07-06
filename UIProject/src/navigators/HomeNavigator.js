import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { createDrawerNavigator, useIsDrawerOpen } from '@react-navigation/drawer';
import SlideMenu from '../childrenComponent/SlideMenu';
import HomeStack from './stack/HomeStack';
import TaskStack from './stack/TaskStack';
import { Button } from 'native-base';
import { Animated, View } from 'react-native';
import ReportStack from './stack/ReportStack';
import ChatStack from './stack/chatStack';



const Drawer = createDrawerNavigator();

const HomeNavigator = ({navigation}) => {
    const [_progress, setProgress] = useState(new Animated.Value(0))
 
    const startScaleAnimation = () => {
        Animated.timing(_progress, {
            toValue: 1,
            useNativeDriver: true
        }).start()
    }

    const scale = _progress.interpolate({
        inputRange:[0, 1],
        outputRange:[1, 0.8]
    })

    const screenStyle = { transform: [{ scale }] };

    return(
        <View style={{ backgroundColor: "#786fa6", flex: 1 }}>
            <Drawer.Navigator
                screenOptions={{
                    swipeEnabled: false,
                }}
                drawerType="slide"            
                sceneContainerStyle={{ backgroundColor: "transparent"}}
                overlayColor="transparent"
                drawerContentOptions={{
                    activeBackgroundColor:"transparent",
                    activeTintColor:"green",
                    inactiveTintColor:"green"
                }}
                drawerContent = {  (props) => {      
                    return <SlideMenu {...props}/>
                }}  
                drawerStyle={{ width: "75%", backgroundColor:"transparent"}}>
                <Drawer.Screen  name="HomeStack">
                    { props => <HomeStack {...props} style={screenStyle} _progress={_progress} onOpenDrawer={startScaleAnimation} /> } 
                </Drawer.Screen> 
                <Drawer.Screen name = "TaskStack" component={TaskStack}/>
                <Drawer.Screen name = "ReportStack" component={ReportStack}/>
                <Drawer.Screen name = "ChatStack" component={ChatStack}/>
            </Drawer.Navigator> 
        </View>
    )
}
export default HomeNavigator;