import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';


export const readData = async () => {
    let billsData = []
    try {
        const jsonVal = await AsyncStorage.getItem('bills')
        if (jsonVal !== null) {
            billsData = JSON.parse(jsonVal)
        }
        return billsData
    }
    catch (e) {
        return billsData
    }
}

export const readPaymentRecords = async (billName) => {
    const key = `${billName}-payments`
    try {
        const paymentsJSON = await AsyncStorage.getItem(key)
        if (paymentsJSON !== null) {
            return (JSON.parse(paymentsJSON))
        } else {
            return []
        }
    } catch (e) {
        return []
    }
}


export const addBill = async (name, billAmtType, amount, frequency) => {

    let oldBillList = []
    try {
        oldBillListJSON = await AsyncStorage.getItem('bills')
        if (oldBillListJSON !== null) {
            oldBillList = JSON.parse(oldBillListJSON)
        }
    } catch (e) {
    }

    console.log("Model, L23 : oldBillList ", oldBillList)

    let nameTaken = false
    if (oldBillList.length !== 0) {
        nameTaken = oldBillList.some((bill) => {
            return bill.name === name
        })
    }

    if (nameTaken) {
        ToastAndroid.show(`${name} in use. Pick different name.`, ToastAndroid.SHORT)
        return false
    }

    const newBill = {
        name: name,
        billAmtType: billAmtType,
        amount: amount,
        frequency: frequency
    }

    const newBillList = [...oldBillList, newBill]
    try {
        await AsyncStorage.setItem('bills', JSON.stringify(newBillList))
        ToastAndroid.show('Saved Bill ', ToastAndroid.SHORT)
        return true
    } catch (e) {
        return false
    }

}


export const resetDB = async () => {
    const x = [
        { name: "test-1", billAmtType: "notFixedAmt", amount: null, frequency: 'monthly' },
        { name: "test-2", billAmtType: "notFixedAmt", amount: null, frequency: 'other' },
    ]

    try {
        AsyncStorage.removeItem('bills')
    } catch (e) {
    }
}


export const restoreBills = async (billsObj) => {
    const bills = billsObj.bills


    await AsyncStorage.setItem('bills', JSON.stringify(bills))
}

export const restorePayments = async (paymentRecord, billName) => {

    const key = `${billName}-payments`
    await AsyncStorage.setItem(key, JSON.stringify(paymentRecord))

    //await AsyncStorage.setItem('bills', JSON.stringify(bills))
}
