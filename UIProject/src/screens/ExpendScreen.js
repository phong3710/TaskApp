import _ from 'lodash';

import React, {useCallback} from 'react';
import {Platform, StyleSheet, Alert, View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {LocaleConfig, ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import { Button } from 'native-base';
import { SpeedDial } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Header from '../childrenComponent/Header';

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);
const themeColor = 'black';

LocaleConfig.locales['vn'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12'],
  monthNamesShort: ['Thg 1','Thg 2','Thg 3','Thg 4','Thg 5','Thg 6','Thg 7','Thg 8','Thg 9','Thg 10','Thg 11','Thg 12'],
  dayNames: ['Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy','Chủ nhật'],
  dayNamesShort: ['Hai','Ba','Tư','Năm','Sáu','Bảy','CN'],
  today: 'Hôm nay'
};
LocaleConfig.defaultLocale = 'vn';

function getFutureDates(days) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days) {
  return new Date(Date.now() - 864e5 * days).toISOString().split('T')[0];
}

const ITEMS = [
  {title: dates[0], data: [{hour: '12:00', duration: '13:00', title: 'Test'}]},
  {
    title: dates[1],
    data: [
      {hour: '4pm', duration: '1h', title: 'Pilates ABC'},
      {hour: '5pm', duration: '1h', title: 'Vinyasa Yoga'}
    ]
  },
  {
    title: dates[2],
    data: [
      {hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'},
      {hour: '2pm', duration: '1h', title: 'Deep Streches'},
      {hour: '3pm', duration: '1h', title: 'Private Yoga'}
    ]
  },
  {title: dates[3], data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}]},
  {title: dates[4], data: [{}]},
  {
    title: dates[5],
    data: [
      {hour: '9pm', duration: '1h', title: 'Middle Yoga'},
      {hour: '10pm', duration: '1h', title: 'Ashtanga'},
      {hour: '11pm', duration: '1h', title: 'TRX'},
      {hour: '12pm', duration: '1h', title: 'Running Group'}
    ]
  },
  {title: dates[6], data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}]},
  {title: dates[7], data: [{}]},
  {
    title: dates[8],
    data: [
      {hour: '9pm', duration: '1h', title: 'Pilates Reformer'},
      {hour: '10pm', duration: '1h', title: 'Ashtanga'},
      {hour: '11pm', duration: '1h', title: 'TRX'},
      {hour: '12pm', duration: '1h', title: 'Running Group'}
    ]
  },
  {
    title: dates[9],
    data: [
      {hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'},
      {hour: '2pm', duration: '1h', title: 'Deep Streches'},
      {hour: '3pm', duration: '1h', title: 'Private Yoga'}
    ]
  },
  {title: dates[10], data: [{hour: '12am', duration: '1h', title: 'Last Yoga'}]}
];

// NOTE: only mark dates with data
function getMarkedDates(items) {
  const marked = {};
  items.forEach(item => {
    if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
      marked[item.title] = {marked: true};
    } else {
      marked[item.title] = {disabled: true};
    }
  });
  return marked;
}

function getTheme() {
  const disabledColor = 'gray';

  return {
    'stylesheet.calendar.header': { 
        week: {
            marginTop: 0,
            paddingHorizontal: 15, 
            flexDirection: 'row', 
            justifyContent: 'space-between' 
        },
        header:{
          color: "white",
          paddingLeft:5,
          justifyContent:"center"
        } 
    },
    'stylesheet.day.basic':{
      selected:{
        height:37,
        width: 37,
        borderRadius:5,
        backgroundColor:"#6264A7"        
      },
      dot: {
        width: 3,
        height: 3,
        marginBottom: 1,
        borderRadius: 20,
      },
      todayText: {
        color: "red"
      },
      selectedText: {
        color: "white"
      },
      emptyDayContainer:{
        backgroundColor:"#bfc5c9"    
      }
    },
    // arrows
    arrowColor: 'black',
    arrowStyle: {padding: 0},
    // month
    monthTextColor: 'black',
    textMonthFontSize: 20,
    textMonthFontFamily: 'SEGOEUI',
    textMonthFontWeight: 'bold',
    
    // day names
    textSectionTitleColor: 'black',
    textDayHeaderFontSize: 15,
    textDayHeaderFontWeight: 'bold',
    // dates
    dayTextColor: themeColor,
    textDayFontSize: 14,
    textDayFontWeight: '500',
    textDayStyle: {marginTop: 7, alignSelf:"center"},
    // selected date
    selectedDayTextColor: 'white',
    // disabled date
    textDisabledColor: disabledColor,
    // dot (marked date)
    dotColor:"#6264A7"
  };
}



const AgendaItem = React.memo(function AgendaItem(props) {
  // console.warn('item rendered', Date.now());
  const {item} = props;

  const buttonPressed = useCallback(() => {
    Alert.alert('Show me more');
  }, []);

  const itemPressed = useCallback(() => {
    Alert.alert(item.title);
  }, []);

  if (_.isEmpty(item)) {
    return(
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item}>
      <View style={styles.panel}></View>
      <View style={{ flexDirection: "column", justifyContent:"space-between", flex:.8}}>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={{ flexDirection: "row"}}>
          <Text style={styles.itemHourText}>{item.hour} - {item.duration}</Text>
        </View>
      </View>
      <View style={styles.itemButtonContainer}>
           <TouchableOpacity style={{ height: 30, width: 85, backgroundColor:"#fff", justifyContent:"center", borderRadius: 8}} >                        
               <Text style={{paddingLeft: 10, paddingRight:10, color:"#6264A7"}}>Following</Text>
            </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

const ExpandCalendar = ({ navigation, route, onOpenDrawer }) => {
 const marked = getMarkedDates(ITEMS);
  const theme = getTheme();
  todayBtnTheme = {
    todayButtonTextColor: themeColor,
  };

  const onDateChanged = (/* date, updateSource */) => {
    console.log("date")
    console.log(route.params)
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  };

  const onMonthChange = (/* month, updateSource */ month) => {
    console.log(month)
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };

  const renderItem = ({item}) => {
    return <AgendaItem item={item}/>;
  };

  return (
    <View style={{ flex: 1, backgroundColor:"#fff"}}>
      <Header openBurgerMenu = { ()=> {navigation.openDrawer(), onOpenDrawer()}} />
     <CalendarProvider
      date={ITEMS[0].title}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      // showTodayButton
      disabledOpacity={0.6}
      >
        <ExpandableCalendar
          horizontal={true}
          hideArrows = {true}
          disablePan = {false}
          calendarStyle={styles.calendar}
          disableWeekScroll={false}
          theme={theme}
          markedDates={marked}
          animateScroll
        />
      <AgendaList
        sections={ITEMS}
        renderItem={renderItem}
        sectionStyle={styles.section}
        
      />
      </CalendarProvider>
      <SpeedDial.Action
        containerStyle={{position:"relative"}}
        buttonStyle={{ borderRadius:50, backgroundColor:"#fff", height:60, width:60}}
        icon={{ name: 'add', color: '#6264A7'}}
        placement="right"
        onPress={() => navigation.navigate('EventDrawer')}
        raised={true}
      />
    </View>
  );
};
export default  ExpandCalendar;
const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  header:{
    backgroundColor:"#fff",
    height:100
  },
  section: {
    textTransform: 'capitalize',
    backgroundColor:"#fff",
    color:"black", 
    fontSize:15
  },
  item: {
    padding: 10,
    backgroundColor: '#6264A7',
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
    margin:20,
    borderRadius: 10,
    height: 70,
  },
  itemHourText: {
    color: '#fff',
    marginLeft: 16,
    fontSize: 15,
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: '#fff',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 15,
    marginTop:5
  },
  itemButtonContainer: {
    flex: .5,
    flexDirection:"row",
    alignSelf:"flex-start",
    justifyContent:"flex-end", 
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  emptyItemText: {
    color: '#6264A7',
    fontSize: 14
  },
  panel: {
    borderRadius: 4,
    backgroundColor: "#fff",
    width:6,
  },
  followButton: {
    color: "black"
  }
});
