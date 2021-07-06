import React, { useState, useRef, useEffect} from 'react';
import {  Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Text, Button, Item } from 'native-base';
import AntDesgin from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import TextInputComponent from '../../childrenComponent/ingredientComponent/TextInputComponent';
import SwitchComponent from '../../childrenComponent/ingredientComponent/SwitchComponent';
import DatePickerComponent from '../../childrenComponent/ingredientComponent/DatePickerComponent';
import DropDownComponent from '../../childrenComponent/ingredientComponent/DropdownComponent';
import Loading from '../../childrenComponent/Loading'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchTaskFormFailed, fetchTaskFormRequest, fetchTaskFormSuccess } from '../../action/taskFormAction';
import axios from 'axios';
import RadioButtonComponent from '../../childrenComponent/ingredientComponent/RadioButtonComponent';
import TextAreaComponent from '../../childrenComponent/ingredientComponent/TextAreaComponent';
import { useIsFocused } from '@react-navigation/native';

const size = 22;

const EventCalendar = ( {navigation, route} ) => {
    const intervalMinutes = 1000 * 60 * 5;
    const sheetRef = useRef();
    const fall = new Animated.Value(1)
    const getTimeDate = new Date();
    const dispatch = useDispatch()
    const taskForm = useSelector(state => state.taskFormReducer)
    const [dateStart, setDateStart] = useState(new Date ( Math.round(getTimeDate / intervalMinutes)*intervalMinutes));
    const [formData, setformData] = useState([])
    const [loading, setloading] = useState(false)
    const [dropDownData, setDropDownData] = useState([])
    const [renderUserData, setRenderUserData] = useState(dropDownData)
    const bodyFormData = new FormData()
    const [search, setSearch] = useState('')
    const [stateName, setstateName] = useState('')
    const isFocused = useIsFocused();
    
    // Fetch data
    useEffect( async () => {
        const token = await AsyncStorage.getItem('@token')
        const key = await AsyncStorage.getItem('@key')
        bodyFormData.append('token', token)
        bodyFormData.append('key', key)
        if(isFocused === true){
            setloading(true)
            dispatch(fetchTaskFormRequest)
            await axios.post('https://icrm-product-api-v2.isdcorp.vn/Task/GetTaskConfigFieldBy?WorkFlowCode=MISSION', bodyFormData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then( response => {
                var data = response.data
                dispatch (fetchTaskFormSuccess(data))
                setloading(false)
            })
            .catch( error => {
                var errorMsg = error
                Alert.alert("Thông báo", "Tải dữ liệu thất bại...")
                setloading(false)
                dispatch (fetchTaskFormFailed(errorMsg))
            })
        }
    }, [isFocused])

    // TextInput
    const onChangTextInput = (value, name) => {
        setformData({
            ...formData,
            [name]: value.trim() 
        })
        console.log(formData)
    }
    
    //Switch
    const onSwitch = (e, name) => {
        setformData({
            ...formData,
            [name]: e  
        })
    }

    //Date Picker
    const onChangeDatePicker = (date, name) =>{
        setDateStart(date)
        setformData({
            ...formData,
            [name]: date
        })
    };


    //Drop down 
    const addUser = async (item, stateName) => {
        sheetRef.current.snapTo(1)
        if (!formData[`${stateName}`])
            formData[`${stateName}`] = []
        formData[`${stateName}`].push(item)
        setformData({
            ...formData
        })
        setloading(false)     
    }

    const removeUser = (index, stateName) => {
        setTimeout(() => {
            if(index !== -1)
            formData[`${stateName}`].splice(index, 1)
            setformData({
                ...formData
            })
        }, 0);
    }

    const searchUser = (e) => {
        setSearch(e)
        let text = e.toLowerCase();
        let trucks = dropDownData;
        let filterName = trucks.filter((item) => {
            if(item.name.toLowerCase().match(text)){
                return item.name
            }
        })
        if( !text || text === '' ){
            setRenderUserData(trucks)
        }
        if(!filterName || filterName.length === 0 ){
            setRenderUserData([])
        }
        if( filterName && filterName.length !== 0 ){
            setRenderUserData(filterName)
        }
    }
    
    //Render content bottom sheet
    const renderListPerson = (item) => {
        return (
            <View style={{...style.item}}> 
                <View style={{ flexDirection:"row", alignItems:"center"}}>
                    <AntDesgin  
                        name="user" 
                        size={size} 
                        color="#2f3542" 
                    />
                    <Text style={style.iconText}>{item.name}</Text>
                </View>
                <TouchableOpacity 
                    style={{ flexDirection:"row", flex:1, justifyContent:"flex-end"}}
                    onPress = {() => addUser(item, stateName)}
                    >
                    <Ionicons 
                        name="ios-add-circle" 
                        size={size} 
                        color="#e74c3c" 
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const renderContentBottomSheet = (data) => {
        if( data.length !== 0) {
            return (
                    <View 
                        style={{ 
                            backgroundColor:"#fff", 
                            height:"100%", 
                            width:"100%"
                        }}>
            
                            <View style={{...style.item, paddingLeft: 10, marginTop: 30, marginBottom: 30}}>
                                <TextInput
                                    value={search}
                                    onChangeText={searchUser} 
                                    style={{fontSize:15}} 
                                    placeholder="Tìm kiếm..."
                                    placeholderTextColor="#2f3542"
                                />
                            </View>
                        
                        <ScrollView 
                            showsVerticalScrollIndicator={true}
                            alwaysBounceVertical={true}>
                            {data.map((item, index) => {
                                return (
                                    <View key={index}>
                                        {renderListPerson(item)} 
                                    </View>
                                )     
                            })}
                    </ScrollView>
                    </View>
                )
        } else return (
            <View 
                style={{ 
                    backgroundColor:"#fff", 
                    height:"100%", 
                    width:"100%"
                }}>

                <View style={{...style.item, paddingLeft: 10, marginTop: 30, marginBottom: 30}}>
                    <TextInput
                        value={search}
                        onChangeText={searchUser} 
                        style={{fontSize:15}} 
                        placeholder="Tìm kiếm..."
                        placeholderTextColor="#2f3542"
                    />
                </View>
            
                <ScrollView showsVerticalScrollIndicator={true} alwaysBounceVertical={true}>
                    <Text style={{ justifyContent:"center", textAlign:"center", color:"red"}}>
                        Không có dữ liệu!
                    </Text>
                </ScrollView>
            </View>
        )

    }

    // Render header bottom sheet
    const renderHeaderBottomSheet = () => {
        return (
            <TouchableOpacity 
                activeOpacity={1} 
                style={style.headerBottomSheet}
                onPress = {() => sheetRef.current.snapTo(1)}
            >
                <View style={{ alignItems:"center"}}/>
            </TouchableOpacity>
        )
    }

    // Render form body data
    const renderItems = (taskForm.taskForm.length !==0  && taskForm.taskForm.Data )?
    taskForm.taskForm.Data.map((item, index) => { 
        switch (item.typeField){  
            case 'TextInput':
                return (
                    <TextInputComponent
                        onChangeTextInput = {onChangTextInput}
                        key={index} 
                        textField = {item.textField}
                        iconName = {item.iconName} 
                        iconSize = {item.iconSize}
                        placeholder = {item.placeHolder}
                        stateName = {item.stateName}
                    />
                )
            case 'Switch': 
                return (
                    <SwitchComponent
                        key={index}
                        value= { formData[`${item.stateName}`]} 
                        iconName = {item.iconName} 
                        iconSize = {item.iconSize}
                        textField = {item.textField}
                        onValueChange = {onSwitch}
                        stateName = {item.stateName}    
                    />
                )
            case "DropDown": 
                return (
                    <DropDownComponent
                        key={index} 
                        onPress = {() => { 
                            sheetRef.current.snapTo(0), 
                            setstateName(item.stateName)
                            setRenderUserData(item.DropDownData), 
                            setDropDownData(item.DropDownData)} 
                        }
                        iconName = {item.iconName} 
                        iconSize = {item.iconSize}
                        textField = {item.textField}
                        formData = {formData}
                        removeUser = {removeUser}
                        stateName={item.stateName}
                    />
                )
            case "DatePicker": 
                return (
                    <DatePickerComponent
                        key={index} 
                        textField = {item.textField}
                        dateStart = { dateStart }
                        onChangeDatePicker = { onChangeDatePicker }
                        stateName = {item.stateName}
                    /> 
                )
            case "TextArea":
                return (
                    <TextAreaComponent
                        key={index} 
                        stateName={ item.stateName }
                        onChangeTextArea = {onChangTextInput}
                        textField = {item.textField}
                        placeholder = {item.placeHolder}
                    />
                )
            case"Radio":
                    return (
                        <RadioButtonComponent 
                        key={index}
                        />
                    )
            default: return <View/>
        }
    }) : <View/>


    // render body
    return (
        <View style={style.container}>
            <ScrollView>
                <View style={{...style.item}}>
                    
                    <TouchableOpacity onPress={() => navigation.push('Home') }>
                        <Text style={{textDecorationLine:"underline"}}>Hủy</Text>
                    </TouchableOpacity>
                    
                    <Text style={{fontWeight:"bold", fontSize:18}}>Sự kiện mới</Text>

                    <TouchableOpacity>
                        <Text style={{ fontWeight:"bold", textDecorationLine:"underline" }}>Xong</Text>
                    </TouchableOpacity>  
                </View>
                
                {renderItems}
                
            </ScrollView>
            <Loading loading = {loading}/>
            <BottomSheet
                    ref={sheetRef}
                    snapPoints={["100%", 0]}
                    initialSnap = {1}
                    callbackNode={fall}
                    enabledGestureInteraction = {false}
                    borderRadius={10}
                    renderContent={()=>renderContentBottomSheet(renderUserData)}
                    renderHeader={renderHeaderBottomSheet}
            />  
      </View>
    )
}
export default EventCalendar;

const style = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        justifyContent:"flex-start",
        backgroundColor:"#fff",
    
    },

    item:{
        height:60,
        backgroundColor:"#fff",
        elevation: 0, 
        shadowOpacity:0,
        paddingLeft:20,
        paddingRight:20,
        flexDirection:"row", 
        justifyContent:"space-between",
        alignItems:"center",
        
    },
    iconText: {
        paddingLeft:20,
         fontSize:15, 
         color:"#2f3542"
    },
    button: {
        width:"100%",
        height:"100%",
        flexDirection:"row",
        justifyContent:"space-between", 
        backgroundColor:"#fff", 
        elevation: 0, 
        shadowOpacity:0
    },
    headerBottomSheet: {
        backgroundColor:"rgba(0, 0, 0, 0.8)",
        paddingTop: 20,
        height: 200
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20
    },
    panelHeader: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#00000040",
        marginBottom: 10 
    }
})