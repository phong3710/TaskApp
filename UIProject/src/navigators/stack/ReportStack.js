import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import Report from "../../screens/Report/Report";

const Stack = createStackNavigator();

const ReportStack = () => {
    return(
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Report" component={Report} />
        </Stack.Navigator>
    )
}
export default ReportStack