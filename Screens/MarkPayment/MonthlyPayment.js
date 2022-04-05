import React from 'react'
import {View, ToastAndroid} from 'react-native'
import { Button, Card, List, TextInput } from 'react-native-paper'
import {months} from '../../Model/Months'
import { makeMonthlyPayment, showPayments } from '../../Model/Payment'

export default function MonthlyPayment({route, navigation}){

        const {bill} = route.params
        console.log("MopnthlyPayment.js, L10 bill : ", bill)
        const [expanded, setExpanded] = React.useState(false)
        const [selectedMonth, setMonth] = React.useState('Pick Month')

        const [paymentAmount, setAmount] = React.useState(bill.amount!==null? bill.amount : '')
        const [amtError, setAmtError] = React.useState(false)

        const [paymentMethod, setMethod] = React.useState('')
        const [methodError, setMethodError] = React.useState(false)

        const selectMonth = (month) =>{
            setExpanded(false)
            setMonth(month)
            console.log(month)
        }

        function resetErrors(){
            setAmtError(false)
            setMethodError(false)
        }

        const save = () =>{
            resetErrors()
            let error = false
            
            if(selectedMonth==='Pick Month'){
                error = true
                ToastAndroid.show('Pick Month of Payment', ToastAndroid.LONG)
            }

            if(paymentAmount===''){
                error = true
                setAmtError(true)
            }
            if(paymentMethod===''){
                error = true
                setMethodError(true)
            }

            if(error) return

            makeMonthlyPayment(bill.name, selectedMonth, paymentAmount, paymentMethod)
        }
        
        return(
            <View>
            <Card>
                <Card.Title title ={bill.name}/>
                <Card.Content>
                    <List.Section title='Pick Month'>
                        <List.Accordion title={selectedMonth} expanded={expanded} onPress={()=>{setExpanded(!expanded)}}>
                            {months.map((month)=>{
                                return(
                                    <List.Item key={month.name}
                                        title={month.name}
                                        onPress={()=>{selectMonth(month.name)}}
                                    />
                                )
                            })}
                        </List.Accordion>
                    </List.Section>
                </Card.Content>
            </Card>
            <Card>
                <Card.Title title='Payment Details'/>
                    <Card.Content>
                        <TextInput 
                            mode='outlined'
                            label='Amount'
                            keyboardType='numeric'
                            error={amtError}
                            value={paymentAmount}
                            onChangeText={amt => setAmount(amt)}
                            />
                        <TextInput 
                            mode='outlined'
                            value={paymentMethod}
                            error={methodError}
                            label='Method'
                            placeholder='card, cash etc'
                            onChangeText={text=> setMethod(text)}
                        />
                    </Card.Content>
            </Card>

            <Button onPress={()=>{save()}}>Save</Button>

            <Button onPress={()=>{showPayments(bill.name)}}>Show payments</Button>
            </View>
        )
    }

