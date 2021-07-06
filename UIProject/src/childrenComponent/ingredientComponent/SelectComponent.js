import React, { useState } from 'react'
import { Select, View } from 'native-base'
import { Dimensions, ScrollView } from 'react-native'
import { Divider } from 'native-base';

const {width, height} = Dimensions.get("screen");

const SelectComponent = () => {
    const [value, setvalue] = useState("")

    return(
        <View style={{ marginHorizontal: 20}}>
        <Select
            selectedValue={value}
            accessibilityLabel="Tên công ty"
            placeholder="Tên công ty"
            variant="underlined"
            itemStyle={{ backgroundColor:"red"}}
            onValueChange={(itemValue, itemIndex) => {setvalue(itemValue)}}
            _actionSheetContent={(Children) => <ScrollView style={{ backgroundColor:"red"}} >{Children}</ScrollView>}

        >
                <Select.Item  label="ISD" value="isd"  />
                <Divider my={2} />
                <Select.Item label="An Cường" value="ancuong"  />
                <Divider my={2} />
                <Select.Item label="Microsoft" value="microsoft" />
                <Divider my={2} />
        </Select>
        </View>
    )
}
export default SelectComponent;