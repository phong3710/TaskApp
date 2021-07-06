import React, { createRef, useState } from 'react';
import { Text, Item, Button } from 'native-base';
import { Image, SafeAreaView, StyleSheet, ActivityIndicator, View, TouchableOpacity, Alert, ScrollView, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesgin from 'react-native-vector-icons/AntDesign'
import FontAweSome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Carousel from 'react-native-snap-carousel' 
const { height, width} = Dimensions.get("screen")

const Kanban = ({navigation}) => {
    const carousel = createRef()
    const [activeIndex, setActiveIndex] = useState(0)
    const [carouselItems,setCarouselItems ] = useState(
        [
            {
                title:"Item 1",
                text: "Text 1",
            },
            {
                title:"Item 2",
                text: "Text 2",
            },
            {
                title:"Item 3",
                text: "Text 3",
            },
            {
                title:"Item 4",
                text: "Text 4",
            },
            {
                title:"Item 5",
                text: "Text 5",
            },
        ]
    )

    const _renderItem = ({item, index}) => {
        return (
            <View style={style.containerView}>
                <View style={style.title}>
                    <Text style = {{
                            ...style.text,
                            fontWeight:"bold",
                            fontSize:18,
                            color:"#fff"
                        }}
                    >
                            Đang theo dõi
                    </Text>
                </View>
                <View style={ style.itemContainer } >
                    <View style={ style.iconView }>
                        <FontAwesome5 name="tasks" size={22} color="#2f3542"/>
                    </View>
                    <View style={ style.item }>
                        <View style={ style.itemChild1}>
                            <Text style={{...style.text, 
                                fontWeight: "bold",
                                fontSize:15
                            }}>ADMIN</Text>
                        </View>
                        <View style={ style.itemChild2 }>
                            <View style={{ justifyContent:"center", alignItems:"flex-start"}}>
                                <Text style={ style.text} >Mã Task: 001</Text>
                                <Text style={ style.text}>Ngày bắt đầu: 24/06/2021 </Text>
                            </View>
                        
                        </View>
                    </View>
                    <View  style={{ flex: .2, justifyContent:"center", alignItems:"center"}}>
                        <Ionicons name="checkmark-circle" size={22} color="#9c88ff"/>
                        <Text style={{...style.text}}>Đã vào</Text>
                    </View>
                </View>
            </View>
           
        );
    }
    return (
            <View style={style.container}>
                <View style={{ marginTop: 30}}>
                    <Carousel
                    layout={"default"}
                    ref={carousel}
                    data={carouselItems}
                    sliderWidth={width}
                    itemWidth={width * 80/100 }
                    renderItem={_renderItem}
                    onSnapToItem = { index => setActiveIndex(index)} />
                </View>
            </View> 

    )
}
export default Kanban;
const style = StyleSheet.create({
    container: {
       flex: 1,
       height:"100%",
       alignItems:"center",
       backgroundColor:"#fff"
    },
    title:{
        width:"100%",
        paddingHorizontal: 30, 
        paddingTop: 20,
        paddingBottom:20
    },
    containerView: {
        backgroundColor:"#9c88ff", 
        height:"90%", 
        alignItems:"center",
        borderRadius: 20
    },
    itemContainer: {
        backgroundColor:"#f5f6fa",
        flexDirection:"row",
        width: "90%",
        paddingVertical: 10,
        height: 100,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: '#fff',
        shadowOpacity: .8,
        borderColor:"#fff",
        elevation: 2,
    }, 
    iconView: {
        flex: .2,
        alignItems:"center", 
        justifyContent:"center",
        flexDirection:"row",
    }, 
    item: {
        flexDirection:"column",
        flex: .6
    }, 
    itemChild1: {
        justifyContent:"center",
        alignItems:"flex-start",
        flex: .5,
        borderBottomWidth: .5,
        borderColor: "#7f8fa6",
    }, 
    itemChild2: {
        flexDirection:"row",
        flex:.5,
        paddingVertical: 10,
    },
    text: {
        color: "#2f3542",
        fontSize: 14,
        fontWeight:"900"
    }
})