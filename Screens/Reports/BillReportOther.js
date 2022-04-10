import React from 'react'
import {ActivityIndicator, View} from 'react-native'
import { DataTable } from 'react-native-paper'
import { fetchPayments } from '../../Model/Payment'


class BillReportOther extends React.Component{
    constructor(props) {
        super(props)
        this.state = { dataLoaded: false}
    }

    async componentDidMount(){
        const {billName} = this.props.route.params
        const billData = await fetchPayments(billName)
        this.setState({billData : billData, dataLoaded : true})
    }

    render(){
        const {billName, title} = this.props.route.params

        this.props.navigation.setOptions({
            title : `Payments : ${title}`
        })


        const setBillData = (billDataNew) =>{
            this.setState({billData : billDataNew, dataLoaded : true})
        }

        //navigate to remove record page
        const removeRecord = async (billInstance) =>{
            this.setState({dataLoaded : false})
            this.props.navigation.navigate('RemoveRecord', {
                billInstance : billInstance,
                setBillData : setBillData
            })
            await fetchPayments(billName).then((res)=>{
            })
        }

        if (!this.state.dataLoaded) return (
            <View>
                <ActivityIndicator size='large' style={{ padding: 100 }} />
            </View>
        )
        return(
            <View>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Date</DataTable.Title>
                        <DataTable.Title >Amount</DataTable.Title>
                        <DataTable.Title>Method</DataTable.Title>
                    </DataTable.Header>
                    {this.state.billData.map((billPaymentInstance)=>{
                        return(
                            <DataTable.Row key={billPaymentInstance.paymentDate} onPress={()=>{removeRecord(billPaymentInstance)}}>
                                <DataTable.Cell>{billPaymentInstance.paymentDate}</DataTable.Cell>
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


export default BillReportOther