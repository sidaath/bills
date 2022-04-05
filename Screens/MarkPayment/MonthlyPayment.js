import React from 'react'
import {View} from 'react-native'
import { Button, Card, List, TextInput } from 'react-native-paper'
import {months} from '../../Model/Months'

export default function MonthlyPayment({route, navigation}){

        const [expanded, setExpanded] = React.useState(false)
        const [selectedMonth, setMonth] = React.useState('Pick Month')

        const [paymentAmount, setAmount] = React.useState('')
        const [paymentMethod, setMethod] = React.useState('')
        const [amtError, setAmtError] = React.useState(false)

        const selectMonth = (month) =>{
            setExpanded(false)
            setMonth(month)
            console.log(month)
        }
        
        return(
            <View>
            <Card>
                <Card.Title title = "Title of Bill"/>
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
                            label='Method'
                            placeholder='card, cash etc'
                            onChangeText={text=> setMethod(text)}
                        />
                    </Card.Content>
            </Card>

            <Button>Save</Button>
            </View>
        )
    }

