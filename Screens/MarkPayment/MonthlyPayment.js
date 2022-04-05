import React from 'react'
import { View, ToastAndroid, StyleSheet } from 'react-native'
import { Button, Card, Menu, TextInput } from 'react-native-paper'
import { months } from '../../Model/Months'
import { makeMonthlyPayment, showPayments, removePayments } from '../../Model/Payment'

export default function MonthlyPayment({ route, navigation }) {

    const { bill } = route.params
    console.log("MopnthlyPayment.js, L10 bill : ", bill)
    const [expanded, setExpanded] = React.useState(false)
    const [selectedMonth, setMonth] = React.useState('Pick Month')

    const [paymentAmount, setAmount] = React.useState(bill.amount !== null ? bill.amount : '')
    const [amtError, setAmtError] = React.useState(false)

    const [paymentMethod, setMethod] = React.useState('')
    const [methodError, setMethodError] = React.useState(false)

    const selectMonth = (month) => {
        setExpanded(false)
        setMonth(month)
        console.log(month)
    }

    function resetErrors() {
        setAmtError(false)
        setMethodError(false)
    }

    const save = () => {
        resetErrors()
        let error = false

        if (selectedMonth === 'Pick Month') {
            error = true
            ToastAndroid.show('Pick Month of Payment', ToastAndroid.LONG)
        }

        if (paymentAmount === '') {
            error = true
            setAmtError(true)
        }
        if (paymentMethod === '') {
            error = true
            setMethodError(true)
        }

        if (error) return

        const year = (new Date()).getFullYear()
        const monthYear = `${year}/${selectedMonth}`

        makeMonthlyPayment(bill.name, monthYear, paymentAmount, paymentMethod)
    }

    //for meny
    const [visible, setVisible] = React.useState(false)
    const selectMenuItem = (month) => {
        setMonth(month)
        setVisible(false)
    }
    return (
        <View>
            <Card style={styles.card}>
                <Card.Title title={bill.name} />
                <Card.Content>
                    <Menu
                        visible={visible}
                        onDismiss={() => { setVisible(false) }}
                        anchor={
                            <TextInput
                                mode='outlined'
                                value={selectedMonth}
                                onFocus={() => { setVisible(true) }}
                                right={<TextInput.Icon name='tray-arrow-down' onPress={() => { setVisible(true) }} />} />
                        }
                    >
                        {months.map((month) => {
                            return (
                                <Menu.Item key={month.name} title={month.name} onPress={() => { selectMenuItem(month.name) }} />
                            )
                        })}

                    </Menu>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Title title='Payment Details' />
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
                        onChangeText={text => setMethod(text)}
                    />
                </Card.Content>
            </Card>

            <Button onPress={() => { save() }}>Save</Button>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 3
    }
})
