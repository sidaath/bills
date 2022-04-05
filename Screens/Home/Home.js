import React from 'react';
import { Button, Card } from 'react-native-paper';
import { View, ActivityIndicator, ToastAndroid } from 'react-native';
import {readData, resetDB} from '../../Model/BillModel.js'



class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { dataLoaded: false}
    }

    async componentDidMount(){
        console.log("Mounted")
        const data = await readData()
        this.setState({bills : data, dataLoaded : true})
    }

    async componentDidUpdate(){
        console.log("Updated")
        const data = await readData()
        this.state = {bills : data}
        console.log("updated bills : ",this.state.bills)
        
    }

    render() {
        console.log("Home.js, RENDER : bills = ", this.state.refresh)
        const readData2 =  () => {
            console.log("Home.js, Bills state : ", this.state.bills)
        }

        const reload = async () => {
            this.setState({dataLoaded : false})
            const newData = await readData()
            this.setState({bills : newData, dataLoaded : true})
        }
        

        if (!this.state.dataLoaded) return (
            <View>
                <ActivityIndicator size='large' style={{ padding: 100 }} />
            </View>
        )

        return (
            <View>

                <Card
                    onPress={() => {
                        this.props.navigation.navigate('AddNewBill', {
                            bills: this.state.bills,
                            reload : reload
                        })
                    }}>
                    <Card.Title title="Add Bill" />
                    <Card.Content>
                    </Card.Content>
                </Card>

                <Card onPress={() => {
                    this.props.navigation.navigate('ReportHome', {
                        bills: this.state.bills
                                        })
                }}>
                    <Card.Title title="Reports" />
                    <Card.Content>

                    </Card.Content>
                </Card>

                <Card onPress={() => { this.props.navigation.navigate('UpdateHome', {
                    bills : this.state.bills
                }) }}>
                    <Card.Title title="Mark Payment" />
                    <Card.Content>

                    </Card.Content>
                </Card>

                <Card onPress={() => { this.props.navigation.navigate('BackupHome')}}>
                    <Card.Title title='Cloud Backup' />
                </Card>

                <Button onPress={() => { console.log("aeae") }}>Ok</Button>
                <Button onPress={readData2}>Tast</Button>

                <Button onPress={resetDB}>Reset DB</Button>
            </View>
        )
    }
}


export default Home