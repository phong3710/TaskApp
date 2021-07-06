import { Text } from 'native-base';
import React, { createRef, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import {LineChart} from 'react-native-chart-kit'
import Carousel from 'react-native-snap-carousel' 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const Report = ({navigation}) => {
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
                            }}>Tiến độ trong tuần</Text>
                        </View>  
                    </View>
                </View>
            </View>
           
        );
    }

    return(
        <View style={{ backgroundColor:"#fff", flex: 1, paddingHorizontal: 20 }}>
            <View style={{...style.header}}>
                <TouchableOpacity onPress={() => navigation.goBack() }>
                    <Text style={{textDecorationLine:"underline"}}>Hủy</Text>
                </TouchableOpacity>
                
                <Text style={{fontWeight:"bold", fontSize:18}}>Báo cáo</Text>

                <TouchableOpacity>
                    <Text style={{ fontWeight:"bold", textDecorationLine:"underline" }}>Xong</Text>
                </TouchableOpacity>  
            </View>

            <View style={{ marginTop: 10, marginBottom: 20, flexDirection:"row", height: 50, alignItems:'center'}}>
                <View style={{width: 8, height: "70%", backgroundColor:"#e74c3c", borderRadius: 5}}/>
                <View style={{ 
                        backgroundColor:"#e74c3c", 
                        height:"70%", 
                        marginLeft: 10, 
                        justifyContent:"center",
                        paddingHorizontal: 10,
                        borderRadius:10

                }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color:"#fff"}}>
                        Tiến độ công việc
                    </Text>
                </View>
            </View>

           <View>
                <LineChart
                    data={{
                    labels: ["1", "2", "3", "4", "5", "6","7"],
                    datasets: [
                        {
                        data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                        ]
                        }
                    ]
                    }}
                    width={Dimensions.get("window").width - 40} // from react-native
                    height={Dimensions.get("window").height/2}
                    yAxisSuffix="k"
                    yAxisInterval={3} // optional, defaults to 1
                    chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    propsForHorizontalLabels:{
                        fontSize: 13
                    },
                    color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})` ,
                    labelColor: (opacity = 1) => `rgba(44, 62, 80,${opacity})`,
                    style: {
                        borderRadius: 10
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 8,
                    borderRadius: 16
                    }}
                />
            </View>
            
            <View style={style.container}>
                <View>
                    <Carousel
                    layout={"default"}
                    ref={carousel}
                    data={carouselItems}
                    sliderWidth={Dimensions.get("screen").width}
                    itemWidth={Dimensions.get("screen").width * 80/100 }
                    renderItem={_renderItem}
                    onSnapToItem = { index => setActiveIndex(index)} />
                </View>
            </View> 
        </View>
    )
}
export default Report
const style = StyleSheet.create({
    container: {
       flex: 1,
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
        alignItems:"center",
        flex: .5,
        borderBottomWidth: .5,
        borderColor: "#7f8fa6",
    }, 
    text: {
        color: "#2f3542",
        fontSize: 14,
        fontWeight:"900"
    },
    
    header:{
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
})