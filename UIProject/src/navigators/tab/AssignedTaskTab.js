import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import 'react-native-gesture-handler';
import React from 'react'; 
import AssignedTask from '../../screens/Tasks/AssignTask';
import Kanban from '../../screens/Tasks/Kanban';
import TabBar from '../../childrenComponent/tabBar';

const Tab = createMaterialTopTabNavigator();

const AssignedTaskTab = () => {
    return (
        <Tab.Navigator 
            tabBarOptions={{
                activeTintColor: '#e91e63',
                inactiveTintColor:"#bfc5c9",
                labelStyle: { 
                    fontSize: 15, 
                    fontWeight:"bold", 
                    color:"black", 
                },
                style:{ backgroundColor:"#fff" }  
            }}
        >
            <Tab.Screen name="Assigned Task"  
                        options={{ tabBarLabel: 'Danh sách' }} 
                        component={AssignedTask}/>
            <Tab.Screen name="Kanban" component={Kanban}/>
        </Tab.Navigator>
    )
}
export default AssignedTaskTab;