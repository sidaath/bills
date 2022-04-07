import React from 'react'
import {ScrollView, ActivityIndicator, StyleSheet} from 'react-native'
import { Button, Card, Paragraph } from 'react-native-paper'
import { removeBill } from '../../Model/BillModel'
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
        const {reload} = this.props.route.params

        const handleDelete = async (billName)=>{
            removeBill(billName).then((res)=>{
                if(res){
                    reload()
                    this.props.navigation.goBack()
                }
            })
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
                        <Card key={record.billName} style={styles.card}>
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

const styles = StyleSheet.create({
    card : {
        margin : 10
    }
})

export default RemoveBill