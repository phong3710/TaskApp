import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import Chat from "../../screens/Chat/Chat";

const Stack = createStackNavigator();

const ChatStack = () => {
    return(
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
    )
}
export default ChatStack