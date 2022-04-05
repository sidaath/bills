import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator, Button, Card, Headline, TextInput } from 'react-native-paper';
import { readData, readPaymentRecords, restoreBills, restorePayments } from '../../Model/BillModel';

export default function BackupHome() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);


    const[email, setEmail] = React.useState('')
    const[password, setPassword] = React.useState('')

    const login = () =>{
        auth().signInWithEmailAndPassword(email,password).then(()=>{
            console.log("Signed In")
        })
        .catch(error=>{
              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
              }
          
              console.error(error);
        })
    }

    const createAccount = ()=>{
        auth().createUserWithEmailAndPassword(email,password).then(()=>{
            console.log("Signed In")
        })
        .catch(error=>{
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
              }
          
              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
              }
          
              console.error(error);
        })
    }

    const [loading, setLoading] = React.useState(false)

    const backupData = async () =>{
        setLoading(true)
        let bills =[]
        try{
            bills = await readData()
            const billsObj = {bills}
            firestore()
                .collection(`${user.uid}`)
                .doc('bills')
                .set(billsObj)
        }catch(e){
            console.log("failed read, ",e)
        }

        bills.map(async (bill)=>{
            try{
                const paymentRecord = await readPaymentRecords(bill.name)
                const recordObj = {paymentRecord}
                firestore().collection(`${user.uid}`)
                .doc(`${bill.name}-payments`)
                .set(recordObj)
            }
            catch(e){
                console.log("BakupHome L 77: ",e)
            }
        })

        setLoading(false)
    }

    const restoreData = async () =>{
        setLoading(true)
        let bills = {}
        firestore()
        .collection(`${user.uid}`)
        .doc('bills')
        .get()
        .then(async (snapshot)=>{
            bills = snapshot.data()
            await restoreBills(snapshot.data())
            console.log("in res bills",bills)
            let billsArray = Array.from(bills.bills)
            console.log(billsArray)
            billsArray.map((bill)=>{
                firestore()
                .collection(`${user.uid}`)
                .doc(`${bill.name}-payments`)
                .get()
                .then(async (snapshotR)=>{
                    console.log("record data",snapshotR.data())
                    let payments = snapshotR.data().paymentRecord
                    console.log("Payments = ",payments)
                    await restorePayments(payments, bill.name)
                })
            })
        })
        setLoading(false)
    }
  
    if (initializing) return null;

    if(loading){
        return(
            <ActivityIndicator size='large' style={{ padding: 100 }}/>
        )
    }
  
    if (!user) {
      return (
        <View>
          <Headline style={{alignSelf: 'center', marginTop: 20, marginBottom:20}} >Login</Headline>

          <Card>
              <Card.Title title='Login Credentials' />
              <Card.Content>
                  <TextInput 
                    mode='outlined'
                    label='Email'
                    value={email}
                    onChangeText={(txt) =>{setEmail(txt)}}
                    keyboardType='email-address'
                  />
                  <TextInput style={{marginTop:40}} 
                    mode='outlined'
                    label='Password'
                    value={password}
                    onChangeText={(txt)=>{setPassword(txt)}}
                    secureTextEntry
                  />
              </Card.Content>
          </Card>
          <Button onPress={()=>{createAccount()}}>Create Account</Button>
          <Button onPress={()=>login()}>Login</Button>
        </View>
      );
    }
  
    return (
      <View>
        <Headline style={{alignSelf:'center', marginTop : 20}}>Welcome {user.email}</Headline>
        <Button onPress={()=>{backupData()}}>Backup to FireStore</Button>
        <Button onPress={()=>{restoreData()}}>Restore Data </Button>
        <Button onPress={()=>{auth().signOut()}}>Logout</Button>
      </View>
    );
  }