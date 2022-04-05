import AsyncStorage from "@react-native-async-storage/async-storage"
import {ToastAndroid} from 'react-native'
export const makePayment = async (bill, month, amount, method)=>{
    const payment = {billName : bill, paymentMonth : month, payAmount : amount, paymentMethod : method}
    console.log("Payment.js payment : ",payment)
    const key = `${bill}-payments`
    console.log("saved key ",key)
    const oldPaymentsJSON = await AsyncStorage.getItem(key)

    
    let newPayments = []
    if(oldPaymentsJSON!==null){
        const oldPayments = JSON.parse(oldPaymentsJSON)
        newPayments = [...oldPayments, payment]
    }else{
        newPayments = [payment]
    }
    
    try{
        await AsyncStorage.setItem(key, JSON.stringify(newPayments))
    ToastAndroid.show("Saved Bill payment", ToastAndroid.SHORT)
    return true
    }catch(e){
        console.log("Payment.js, Billpayment failed ",e)
        return false
    }
    
}


export const showPayments = async (billName) =>{
    const key = `${billName}-payments`
    console.log("reading key ", key)
    try{
        const paymentsJSON = await AsyncStorage.getItem(key)
        if(paymentsJSON !==null){
            console.log(JSON.parse(paymentsJSON))
        }else{
            console.log("Payment.hs ->  History empty")
        }
    }catch(e){
        console.log("Payment.js, fail to read payments ",e)
    }
    
}



