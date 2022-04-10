import React from 'react';
import { Card } from 'react-native-paper';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { readData } from '../../Model/BillModel.js'



class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { dataLoaded: false }
    }

    async componentDidMount() {
        const data = await readData()
        this.setState({ bills: data, dataLoaded: true })
    }

    componentDidUpdate() {
        console.log("Updating HOME")
        if(this.props.route.params?.reload === true){
            console.log("Reload Required for Home")
            !this.state.dataLoaded && this.setState({dataLoaded : false})
            this.props.route.params.reload = false
            readData().then((res)=>{
                this.setState({dataLoaded : true, bills : res})
            })
            .catch((e)=>{
                console.log("Error reading data, HOME UPDATE ",e)
                this.setState({dataLoaded : true, bills : []})
            })
        }
    }

    render() {

        if (!this.state.dataLoaded) return (
            <View>
                <ActivityIndicator size='large' style={{ padding: 100 }} />
            </View>
        )

        return (
            <View>

                <Card style={styles.card}
                    onPress={() => {
                        this.props.navigation.navigate('AddNewBill', {
                            bills: this.state.bills,
                        })
                    }}>
                    <Card.Title title="Add Bill" />
                    <Card.Content>
                    </Card.Content>
                </Card>

                <Card style={styles.card}
                    onPress={() => {
                        this.props.navigation.navigate('RemoveBill')
                    }}>
                    <Card.Title title="Remove Bill" />
                    <Card.Content>
                    </Card.Content>
                </Card>

                <Card style={styles.card} onPress={() => {
                    this.props.navigation.navigate('ReportHome', {
                        bills: this.state.bills
                    })
                }}>
                    <Card.Title title="Reports" />
                    <Card.Content>

                    </Card.Content>
                </Card>

                <Card style={styles.card} onPress={() => {
                    this.props.navigation.navigate('UpdateHome', {
                        bills: this.state.bills
                    })
                }}>
                    <Card.Title title="Mark Payment" />
                    <Card.Content>

                    </Card.Content>
                </Card>

                <Card style={styles.card} onPress={() => { this.props.navigation.navigate('BackupHome') }}>
                    <Card.Title title='Cloud Backup' />
                    <Card.Content>

                    </Card.Content>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        margin: 10
    }
})


export default Home