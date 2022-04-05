import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Card, Text } from 'react-native-paper'
class UpdateHome extends React.Component {
    render() {
        const { route, navigation } = this.props
        const { bills } = route.params
        console.log("UpdateHome.js, L8 bills : ", bills)


        const makePayment = (type, bill) => {
            console.log(type)
            if (type === 'monthly') {
                navigation.navigate('MonthlyPayment', {
                    bill: bill
                })
            }

            if (type === 'other') {
                navigation.navigate('OtherPayment', {
                    bill: bill
                })
            }
        }


        return (
            <ScrollView contentContainerStyle={styles.container}>

                {bills.map((bill) => {
                    return (
                        <Card key={bill.name} style={styles.item} onPress={() => { makePayment(bill.frequency, bill) }} >
                            <Card.Title title={bill.name} subtitle={bill.frequency} />
                            {bill.amount !== null && <Card.Content>
                                <Text>{bill.amount}</Text>
                            </Card.Content>}
                        </Card>
                    )
                })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-around'
    },

    item: {
        width: '45%',
        height: 120,
        marginTop: 10
    }
})

export default UpdateHome