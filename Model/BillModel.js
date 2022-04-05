import AsyncStorage from '@react-native-async-storage/async-storage'; 
import {ToastAndroid } from 'react-native';
export const readData = async () => {
    let billsData = []
    try {
        const jsonVal = await AsyncStorage.getItem('bills')
        if (jsonVal !== null) {
            console.log("BillModel.js, line 6 : raw json read = ", jsonVal)
            billsData = JSON.parse(jsonVal)
        }
        return billsData
    }
    catch (e) {
        console.log("BillModel.js, L16 : error reading bills from asyn storage", e)
        return billsData
    }
}

export const readPaymentRecords = async (billName) =>{
    const key = `${billName}-payments`
    console.log("BillModel key for reading payment records  ", key)
    try {
        const paymentsJSON = await AsyncStorage.getItem(key)
        if (paymentsJSON !== null) {
            return(JSON.parse(paymentsJSON))
        } else {
            return []
        }
    } catch (e) {
        console.log("Payment.js, fail to read payments ", e)
        return []
    }
}


export const addBill = async (name, billAmtType, amount, frequency) => {

    let oldBillList = []
    try{
        oldBillListJSON = await AsyncStorage.getItem('bills')
        if(oldBillListJSON!==null){
            oldBillList = JSON.parse(oldBillListJSON)
        }
    }catch(e){
        console.log("Could not read oldBillList ",e)
    }

    console.log("Model, L23 : oldBillList ", oldBillList)

    let nameTaken = false
    if(oldBillList.length !== 0){
        nameTaken = oldBillList.some((bill)=>{
            return bill.name===name
        })
    }
    
    if(nameTaken){
        console.log("Name taken detected")
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
    console.log("New Buil Liost ", newBillList)
    try {
        await AsyncStorage.setItem('bills', JSON.stringify(newBillList))
        ToastAndroid.show('Saved Bill ', ToastAndroid.SHORT)
        return true
    } catch (e) {
        console.log("could not write bills to storage ", e)
        return false
    }

}


export const resetDB = async() =>{
    const x = [
        {name : "test-1", billAmtType : "notFixedAmt", amount:null, frequency:'monthly'},
        {name : "test-2", billAmtType : "notFixedAmt", amount:null, frequency:'other'},
     ]

    try{
        AsyncStorage.removeItem('bills')
    }catch(e){
        console.log("Could not reset ",e)
    }
}


export const restoreBills = async (billsObj) =>{
    const bills = billsObj.bills
    console.log("Restore from backup bills",bills)
    console.log("Restore from backup bills", typeof(bills))

    await AsyncStorage.setItem('bills', JSON.stringify(bills))
}

export const restorePayments = async (paymentRecord, billName) =>{
    
    const key = `${billName}-payments`
    await AsyncStorage.setItem(key, JSON.stringify(paymentRecord))

    //await AsyncStorage.setItem('bills', JSON.stringify(bills))
}
