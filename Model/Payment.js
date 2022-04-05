import AsyncStorage from "@react-native-async-storage/async-storage"
import { ToastAndroid } from 'react-native'
import uuid from 'react-native-uuid';


const makePayment = async (key, payment) => {
    const id = uuid.v4()
    payment = {...payment, id : id}
    console.log("Payment.js makePayment, payment : ",payment)
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
        console.log("Payment.js, Billpayment failed ", e)
        return false
    }
}

export const makeMonthlyPayment = async (bill, month, amount, method) => {
    const payment = { billName: bill, paymentMonth: month, payAmount: amount, paymentMethod: method }
    console.log("Payment.js payment : ", payment)
    const key = `${bill}-payments`
    console.log("saved key ", key)
    
    const res = await makePayment(key, payment)
    return res

}


export const makeOtherPayment = async (bill, payDate, amount, method) =>{
    const payment = {billName : bill, paymentDate : payDate, payAmount : amount, paymentMethod : method}
    console.log("Payment.js makeOtherPayment, payment = ", payment)

    const key = `${bill}-payments`

    const res  = await makePayment(key, payment)
    return res
}

export const showPayments = async (billName) => {
    const key = `${billName}-payments`
    console.log("reading key ", key)
    try {
        const paymentsJSON = await AsyncStorage.getItem(key)
        if (paymentsJSON !== null) {
            console.log(JSON.parse(paymentsJSON))
        } else {
            console.log("Payment.hs ->  History empty")
        }
    } catch (e) {
        console.log("Payment.js, fail to read payments ", e)
    }

}

export const removePayments = async(billName) =>{
    const key = `${billName}-payments`

    try{
        await AsyncStorage.removeItem(key)
        console.log("Cleared Database of payments")
    }catch(e){
        console.log("Failed to clear payments ", e)
    }
}

export const removeRecord = async (record) => {
    const key = `${record.billName}-payments`
    try{
        const currentRecordJSON = await AsyncStorage.getItem(key)
        const currentRecord = JSON.parse(currentRecordJSON)
        console.log("Fetched record = ", currentRecord)
        const alteredRecord = currentRecord.filter((currentRecord)=>{
            return currentRecord.paymentMonth !== record.paymentMonth
        })

        await AsyncStorage.setItem(key, JSON.stringify(alteredRecord))
        ToastAndroid.show("Removed Record", ToastAndroid.SHORT)
        console.log("Altered Record -> ", alteredRecord)
        return alteredRecord
    }catch(e){
        console.log("Could not remove item ", e)
        return false
    }
}


export const fetchPayments = async (billName)=>{
    const key = `${billName}-payments`
    let paymentArrayJSON = []

    try{
        paymentArrayJSON = await AsyncStorage.getItem(key)
        if(paymentArrayJSON !==null){
            const paymentArray = JSON.parse(paymentArrayJSON)
            console.log(paymentArray)
            return paymentArray
        }else{
            return []
        }
    }catch(e){
        console.log("Payment.js, failure reading payment data", e)
        return paymentArrayJSON
    }

}


