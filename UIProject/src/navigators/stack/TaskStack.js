import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';
import React, {useState} from 'react';  
import Tasks from "../../screens/Tasks/TasksScreen";
import AssignedTaskTab from "../tab/AssignedTaskTab";
import TabBar from "../../childrenComponent/tabBar";

const Stack = createStackNavigator();

const TaskStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name = "Task" 
                component={Tasks} 
                options={{
                    headerShown: false
                }} 
            />
            <Stack.Screen 
                name = "AssignedTaskTab" 
                component={AssignedTaskTab}
                options={{
                    header: props => <TabBar {...props}/> 
                }}
            />
        </Stack.Navigator>
    )
}
export default TaskStack