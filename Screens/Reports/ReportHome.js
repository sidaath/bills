import React from 'react'
import {View, Text} from 'react-native'
import { Card } from 'react-native-paper'

export default function ReportHome({route, navigation}){
    const {bills} = route.params
    console.log(bills)
    return(
        <View>
            {bills.map((bill)=>{console.log(bill.name)})}
            {bills.map((bill)=>{
                return(
                    <Card key={bill.name}>
                        <Card.Title  title={bill.name} />
                    </Card>
                )
            })}
        </View>
    )
}