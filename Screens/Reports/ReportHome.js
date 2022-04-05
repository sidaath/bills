import React from 'react'
import {ScrollView, Text} from 'react-native'
import { Card } from 'react-native-paper'

export default function ReportHome({route, navigation}){
    const {bills} = route.params
    console.log(bills)
    return(
        <ScrollView>
            {bills.map((bill)=>{
                return(
                    <Card key={bill.name} onPress={()=>{navigation.navigate('BillReportMonthly', {billName : bill.name})}}>
                        <Card.Title  title={bill.name} />
                    </Card>
                )
            })}
        </ScrollView>
    )
}