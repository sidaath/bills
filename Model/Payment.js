import AsyncStorage from "@react-native-async-storage/async-storage"
import { ToastAndroid } from 'react-native'
import uuid from 'react-native-uuid';

//save payment record to storage
const makePayment = async (key, payment) => {
    const id = uuid.v4()
    payment = { ...payment, id: id }

    const oldPaymentsJSON = await AsyncStorage.getItem(key)
    let newPayments = []
    if (oldPaymentsJSON !== null) {
        const oldPayments = JSON.parse(oldPaymentsJSON)
        newPayments = [...oldPayments, payment]
    } else {
        newPayments = [payment]
    }

    try {
        await AsyncStorage.setItem(key, JSON.stringify(newPayments))
        ToastAndroid.show("Saved Bill payment", ToastAndroid.SHORT)
        return true
    } catch (e) {
        return false
    }
}

//process monthly type payment for storage
export const makeMonthlyPayment = async (bill, month, amount, method) => {
    const payment = { billName: bill, paymentMonth: month, payAmount: amount, paymentMethod: method }
    const key = `${bill}-payments`

    const res = await makePayment(key, payment)
    return res

}

//process other type payment for storage
export const makeOtherPayment = async (bill, payDate, amount, method) => {
    const payment = { billName: bill, paymentDate: payDate, payAmount: amount, paymentMethod: method }

    const key = `${bill}-payments`

    const res = await makePayment(key, payment)
    return res
}

//develop - log payment records
export const showPayments = async (billName) => {
    const key = `${billName}-payments`
    try {
        const paymentsJSON = await AsyncStorage.getItem(key)
        if (paymentsJSON !== null) {
            console.log(JSON.parse(paymentsJSON))
        } else {
        }
    } catch (e) {
        console.log("Payment.js, Line 58, ",e)
    }

}

//develop - clear payment records
export const removePayments = async (billName) => {
    const key = `${billName}-payments`

    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
    }
}

//remove particular record for a particular service
export const removeRecord = async (record) => {
    const key = `${record.billName}-payments`
    try {
        const currentRecordJSON = await AsyncStorage.getItem(key)
        const currentRecord = JSON.parse(currentRecordJSON)
        const alteredRecord = currentRecord.filter((currentRecord) => {
            return currentRecord.id !== record.id
        })

        await AsyncStorage.setItem(key, JSON.stringify(alteredRecord))
        ToastAndroid.show("Removed Record", ToastAndroid.SHORT)
        return alteredRecord
    } catch (e) {
        return false
    }
}

//return list of payments
export const fetchPayments = async (billName) => {
    const key = `${billName}-payments`
    let paymentArrayJSON = []
    try {
        paymentArrayJSON = await AsyncStorage.getItem(key)
        if (paymentArrayJSON !== null) {
            const paymentArray = JSON.parse(paymentArrayJSON)
            return paymentArray
        } else {
            return []
        }
    } catch (e) {
        return paymentArrayJSON
    }

}


