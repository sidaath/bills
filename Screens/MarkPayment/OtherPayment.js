import React from 'react'
import { View, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Card, TextInput } from 'react-native-paper'
import { makeOtherPayment, removePayments } from '../../Model/Payment'

export default function OtherPayment({ route, navigation }) {

    const { bill } = route.params

    const [date, setDate] = React.useState(new Date())
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);

    const [amount, setAmount] = React.useState('')
    const [method, setMethod] = React.useState('')

    const [dateError, setDateError] = React.useState(false)
    const [amountError, setAmountError] = React.useState(false)
    const [methodError, setMethodError] = React.useState(false)


    function resetErrors() {
        setDateError(false)
        setMethodError(false)
        setAmountError(false)
    }

    const save = () => {
        resetErrors()
        let error = false

        if (date === '') {
            error = true
            setDateError(true)
        }

        if (amount === '') {
            error = true
            setAmountError(true)
        }
        if (method === '') {
            error = true
            setMethodError(true)
        }
        if (error) return

        //call method from model
        makeOtherPayment(bill.name, date.toLocaleDateString(), amount, method)
    }


    //date functions
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };



    return (
        <View>
            <Card style={styles.card}>
                <Card.Title title={bill.name} />
            </Card>
            <Card style={styles.card}>
                <Card.Title title='Payment Details' />
                <Card.Content>
                    <TextInput
                        mode='flat'
                        value={date.toLocaleDateString()}
                        label='Selected Date'
                        onFocus={() => { showDatepicker() }}
                    />
                    {show && <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode='date'
                        onChange={onChange}
                    />}
                    <Button onPress={() => { showDatepicker() }}>Open Date Picker</Button>
                    <TextInput
                        mode='outlined'
                        value={amount}
                        placeholder="Amount"
                        label="Amount"
                        error={amountError}
                        keyboardType='numeric'
                        onChangeText={(text) => setAmount(text)}
                    />

                    <TextInput
                        mode='outlined'
                        value={method}
                        placeholder="Cash, Card etc"
                        label="Payment Method"
                        error={methodError}
                        onChangeText={(text) => setMethod(text)}
                    />

                </Card.Content>
            </Card>

            <Button onPress={() => { save() }}>Save</Button>

        </View>
    )
}

const styles = StyleSheet.create({
    card : {
        margin : 5
    }
})