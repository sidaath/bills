import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';


//read from storage - the list of bills (Mobitel-1, CEB, SLT-2 etc)
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


//add a bill (slt, ceb, mobitel-1 ...)
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

//remove service
export const removeBill = async (billName) => {
    console.log("Remove name ", billName)
    try{
        const oldBills = await readData()
        console.log("Old bills = ",oldBills)
        const newBills = oldBills.filter((bill)=> {return bill.name !== billName})
        console.log("Nw Bills = ", newBills)
        await AsyncStorage.setItem('bills', JSON.stringify(newBills))
        const key = `${billName}-payments`
        await AsyncStorage.removeItem(key)
        ToastAndroid.show("Deleted Bill", ToastAndroid.SHORT)
    }
    catch(e){
        console.log("Error deleting Bill ",e)
    }
}

//develop - reset local db
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

//firebase - replace local bills db with firebase copy
export const restoreBills = async (billsObj) => {
    const bills = billsObj.bills


    await AsyncStorage.setItem('bills', JSON.stringify(bills))
}

//firebase - replace local payment histories with firebase version
export const restorePayments = async (paymentRecord, billName) => {

    const key = `${billName}-payments`
    await AsyncStorage.setItem(key, JSON.stringify(paymentRecord))
}
