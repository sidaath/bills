import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, RadioButton, TextInput } from 'react-native-paper';
import { addBill } from '../../Model/BillModel.js'


export default function AddNewBill({ route, navigation }) {

    //user input
    const [name, setName] = React.useState('')
    const [billAmtType, setBillAmtType] = React.useState('')
    const [billAmt, setBillAmt] = React.useState('')
    const [billFrequency, setBillFrequency] = React.useState('')

    //error states
    const [nameError, setNameError] = React.useState(false)
    const [amtError, setAmtError] = React.useState(false)
    const [amtTypeError, setAmtTypeError] = React.useState(false)
    const [amtFrequencyError, setAmtFreqError] = React.useState(false)


    function resetErrors() {
        setNameError(false)
        setAmtError(false)
        setAmtTypeError(false)
        setAmtFreqError(false)
    }

    function saveNewBill() {
        let error = false
        resetErrors()

        //check if required data is given
        if (name === '') {
            setNameError(true)
            error = true
        }
        if (billAmtType === '' || billFrequency === '') {
            setAmtTypeError(billAmtType === '')
            setAmtFreqError(billFrequency === '')
            error = true
        }
        if (billAmtType === 'fixedAmt' && billAmt === 0) {
            setAmtError(true)
            error = true
        }
        if (error) return

        //data check complete

        //create object to save
        const bill = {
            name: name,
            billAmountType: billAmtType,
            amount: billAmtType === 'fixedAmt' ? billAmt : null,
            frequency: billFrequency,
        }

        //call save method from model
        addBill(bill.name, bill.billAmountType, bill.amount, bill.frequency).then((res) => {
            if (res) {
                navigation.navigate('Home', {
                    reload : true
                })
            }
            else { return }
        })

    }



    return (
        <ScrollView>

            <Card mode='outlined' style={nameError ? styles.cardError : styles.card}>
                <Card.Title title='Bill Type' />
                <Card.Content>
                    <TextInput
                        mode='outlined'
                        placeholder='STL, Mobitel-1, Electricity etc'
                        error={nameError}
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                </Card.Content>
            </Card>


            <Card mode='outlined' style={styles.card}>
                <Card.Title title='Payment Type' subtitle='Fixed amount every time / no set amount' style={amtTypeError ? styles.cardError : null} />
                <Card.Content>
                    <RadioButton.Group onValueChange={newValue => { setBillAmtType(newValue) }} value={billAmtType}>
                        <View>
                            <Text>Fixed Amount </Text>
                            <RadioButton value='fixedAmt' />
                        </View>

                        <View>
                            <Text>Varying Amount </Text>
                            <RadioButton value='notFixedAmt' />
                        </View>

                    </RadioButton.Group>
                </Card.Content>
            </Card>

            {billAmtType === 'fixedAmt' &&
                <Card style={styles.card}>
                    <Card.Title title='Amount' />
                    <Card.Content>
                        <TextInput
                            mode='outlined'
                            label='amount'
                            keyboardType='numeric'
                            value={billAmt}
                            error={amtError}
                            onChangeText={amt => { setBillAmt(amt) }}
                        />
                    </Card.Content>
                </Card>
            }

            <Card style={styles.card}>
                <Card.Title title='Payment Frequency' subtitle='Monthly Payment / No fixed schedule' style={amtFrequencyError ? styles.cardError : null} />
                <Card.Content>
                    <RadioButton.Group value={billFrequency} onValueChange={newValue => { setBillFrequency(newValue) }}>
                        <View>
                            <Text>Monthly </Text>
                            <RadioButton value='monthly' />
                        </View>

                        <View>
                            <Text>Other </Text>
                            <RadioButton value='other' />
                        </View>

                    </RadioButton.Group>
                </Card.Content>
            </Card>


            <Button onPress={() => { saveNewBill() }}> Save </Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cardError: {
        backgroundColor: 'red'
    },

    card: {
        margin: 5
    }

})