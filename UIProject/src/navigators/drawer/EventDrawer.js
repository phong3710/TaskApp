import 'react-native-gesture-handler';
import React from 'react';
import EventCalendar from '../../screens/Event/EventCalendar'
import NoteScreen from '../../screens/Event/NoteScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const EventDrawer = () => {
    return (
        <Drawer.Navigator initialRouteName = "Event">
            <Drawer.Screen name = "Event" component={EventCalendar}/>
            <Drawer.Screen name = "Note" component={NoteScreen}/>
        </Drawer.Navigator>
    )
}
export default EventDrawer;