import React from 'react'
import {ActivityIndicator, View} from 'react-native'
import { DataTable } from 'react-native-paper'
import { fetchPayments } from '../../Model/Payment'


class BillReportMonthly extends React.Component{
    constructor(props) {
        super(props)
        this.state = { dataLoaded: false}
    }

    async componentDidMount(){
        const {billName} = this.props.route.params
        const billData = await fetchPayments(billName)
        console.log("BillReportMonthly.js, didMount billData : ", billData)
        this.setState({billData : billData, dataLoaded : true})
    }




    render(){
        console.log("BillReportMonthly.js, render")



        if (!this.state.dataLoaded) return (
            <View>
                <ActivityIndicator size='large' style={{ padding: 100 }} />
            </View>
        )

        return(
            <View>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Month</DataTable.Title>
                        <DataTable.Title >Amount</DataTable.Title>
                        <DataTable.Title>Method</DataTable.Title>
                    </DataTable.Header>
                    {this.state.billData.map((billPaymentInstance)=>{
                        return(
                            <DataTable.Row>
                                <DataTable.Cell>{billPaymentInstance.paymentMonth}</DataTable.Cell>
                                <DataTable.Cell>{billPaymentInstance.payAmount}</DataTable.Cell>
                                <DataTable.Cell>{billPaymentInstance.paymentMethod}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })}
                </DataTable>
            </View>
        )
    }
}


export default BillReportMonthly