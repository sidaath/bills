
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {  Provider } from 'react-native-paper';
import AddNewBill from './Screens/AddBill/AddNewBill';
import Home from './Screens/Home/Home';
import MonthlyPayment from './Screens/MarkPayment/MonthlyPayment';
import UpdateHome from './Screens/MarkPayment/UpdateHome';
import ReportHome from './Screens/Reports/ReportHome';


class App extends React.Component {

  render() {

    

    const Stack = createNativeStackNavigator();
    //console.log("bills = ", this.state.bills

    return (
      <Provider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddNewBill" component={AddNewBill} />
            <Stack.Screen name="ReportHome" component={ReportHome} />
            <Stack.Screen name="UpdateHome" component={UpdateHome} />
            <Stack.Screen name="MonthlyPayment" component={MonthlyPayment} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }

}


export default App;
