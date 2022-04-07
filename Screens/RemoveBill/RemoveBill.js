import React from 'react'
import {ScrollView, ActivityIndicator} from 'react-native'
import { Button, Card, Paragraph } from 'react-native-paper'
import { readData, removeBill } from '../../Model/BillModel'
import { getRecordNumbers } from '../../Model/Payment'

class RemoveBill extends React.Component{
    constructor(props){
        super(props)
        this.state = {dataLoaded : false}
    }

    async componentDidMount(){
        try{
            const paymentRecords = await getRecordNumbers()
            this.setState({paymentRecords : paymentRecords, dataLoaded : true})
        }catch(e){
            console.log("RemoveBill.js, L18 ERROR : ", e)
        }
    }

    render(){

        const handleDelete = async (billName)=>{
            removeBill(billName)
            this.props.navigation.navigate('Home')
        }

        if(!this.state.dataLoaded){
            return(
                <ActivityIndicator size='large'/>
            )
        }

        return(
            <ScrollView>
                {this.state.paymentRecords.map((record)=>{
                    return(
                        <Card key={record.billName}>
                            <Card.Title title={record.billName} />
                            <Card.Content>
                                <Paragraph>{`Total records : ${record.total}`}</Paragraph>
                            </Card.Content>
                            <Card.Actions>
                                <Button onPress={()=>handleDelete(record.billName)}>Delete</Button>
                            </Card.Actions>
                        </Card>
                    )
                })}
            </ScrollView>
        )
    }

}

export default RemoveBill