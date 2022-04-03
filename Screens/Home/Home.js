import React from 'react';
import { Button, Card } from 'react-native-paper';
import {View} from 'react-native';

class Home extends React.Component{

    
    render(){
        
        
        return(
            <View>

                <Card onPress={()=>{this.props.navigation.navigate('AddNewBill')}}>
                    <Card.Title title="Add Bill" />
                    <Card.Content>
                    </Card.Content>
                </Card>

                <Card onPress={()=>{this.props.navigation.navigate('ReportHome')}}>
                    <Card.Title title="Reports" />
                    <Card.Content>

                    </Card.Content>
                </Card>

                <Card onPress={()=>{this.props.navigation.navigate('UpdateHome')}}>
                    <Card.Title title="Mark Payment" />
                    <Card.Content>

                    </Card.Content>
                </Card>

                <Button onPress={()=>{console.log("aeae")}}>Ok</Button>

            </View>
        )
    }
}


export default Home