import React from 'react'
import { ScrollView, Text } from 'react-native'
import { Card } from 'react-native-paper'

export default function ReportHome({ route, navigation }) {
    const { bills } = route.params
    console.log(bills)

    const showReport = (bill) => {
        console.log(bill)
        if (bill.frequency === 'monthly') {
            console.log("show monthly")
            navigation.navigate('BillReportMonthly', {billName : bill.name})
        }
        if(bill.frequency==='other'){
            navigation.navigate('BillReportOther', {billName : bill.name})
        }
    }
    return (
        <ScrollView>
            {bills.map((bill) => {
                return (
                    <Card key={bill.name} onPress={()=>{showReport(bill)}}>
                        <Card.Title title={bill.name} />
                    </Card>
                )
            })}
        </ScrollView>
    )
}