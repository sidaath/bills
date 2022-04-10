import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { DataTable } from 'react-native-paper'
import { fetchPayments } from '../../Model/Payment'


class BillReportMonthly extends React.Component {
    constructor(props) {
        super(props)
        this.state = { dataLoaded: false }
    }

    async componentDidMount() {
        const {billName, title} = this.props.route.params
        this.props.navigation.setOptions({
            title : `Payments : ${title}`
        })
        const billData = await fetchPayments(billName)
        this.setState({ billData: billData, dataLoaded: true })
    }

    componentDidUpdate(){
        if(this.props.route.params?.reload === true){
            this.props.route.params.reload = false
            this.setState({billData : this.props.route.params.newRecords, dataLoaded : true})
        }else{
            if(this.state.dataLoaded === false){
                this.setState({dataLoaded : true})
            }
        }
    }


    render() {
        //navigate to remove record page
        const removeRecord = async (billInstance) => {
            this.setState({ dataLoaded: false })
            this.props.navigation.navigate('RemoveRecord', {
                billInstance: billInstance,
                parentScreen : this.props.route.name,
            })

        }

        if (!this.state.dataLoaded) return (
            <View>
                <ActivityIndicator size='large' style={{ padding: 100 }} />
            </View>
        )

        return (
            <View>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Month</DataTable.Title>
                        <DataTable.Title >Amount</DataTable.Title>
                        <DataTable.Title>Method</DataTable.Title>
                    </DataTable.Header>
                    {this.state.billData.map((billPaymentInstance) => {
                        return (
                            <DataTable.Row key={billPaymentInstance.paymentMonth} onPress={() => { removeRecord(billPaymentInstance) }}>
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