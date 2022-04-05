import React from 'react'
import { View, Text } from 'react-native'
import { Button, Card, TextInput } from 'react-native-paper'
import { makeOtherPayment } from '../../Model/Payment'

export default function OtherPayment({ route, navigation }) {

    const { bill } = route.params

    const [date, setDate] = React.useState('')
    const [amount, setAmount] = React.useState('')
    const [method, setMethod] = React.useState('')

    const [dateError, setDateError] = React.useState(false)
    const [amountError, setAmountError] = React.useState(false)
    const [methodError, setMethodError] = React.useState(false)

    
    function resetErrors(){
        setDateError(false)
        setMethodError(false)
        setAmountError(false)
    }

    const save = () =>{
        resetErrors()
        let error = false
        
        if(date===''){
            error = true
            setDateError(true)
        }

        if(amount===''){
            error = true
            setAmountError(true)
        }
        if(method===''){
            error = true
            setMethodError(true)
        }
        if(error) return

        makeOtherPayment(bill.name, date, amount, method)
    }



    return (
        <View>
            <Card>
                <Card.Title title={bill.name} />
            </Card>
            <Card>
                <Card.Title title='Payment Details' />
                <Card.Content>
                    <TextInput
                        mode='outlined'
                        value={date}
                        placeholder="date of payment"
                        label="Date"
                        error={dateError}
                        onChangeText={(text)=>setDate(text)}
                    />

                    <TextInput
                        mode='outlined'
                        value={amount}
                        placeholder="Amount"
                        label="Amount"
                        error={amountError}
                        onChangeText={(text)=>setAmount(text)}
                    />

                    <TextInput
                        mode='outlined'
                        value={method}
                        placeholder="Cash, Card etc"
                        label="Payment Method"
                        error={methodError}
                        onChangeText={(text)=>setMethod(text)}
                    />

                </Card.Content>
            </Card>

            <Button onPress={()=>{save()}}>Save</Button>
        </View>
    )
}