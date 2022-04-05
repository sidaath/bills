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


export const addBill = async (name, billAmtType, amount, frequency) => {

    const oldBillListJSON = await AsyncStorage.getItem('bills')
    const oldBillList = JSON.parse(oldBillListJSON)
    console.log("Model, L23 : oldBillList ", oldBillList)
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
        await AsyncStorage.setItem('bills', JSON.stringify(x))
    }
    catch(e){
        console.log("Failed to resetDB ",e)
    }
}