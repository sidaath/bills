import React from 'react';
import { Card } from 'react-native-paper';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { readData, resetDB } from '../../Model/BillModel.js'



class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { dataLoaded: false }
    }

    async componentDidMount() {
        const data = await readData()
        this.setState({ bills: data, dataLoaded: true })
    }

    async componentDidUpdate() {
        const data = await readData()
        this.state = { bills: data }
    }

    render() {
        const reload = async () => {
            this.setState({ dataLoaded: false })
            const newData = await readData()
            this.setState({ bills: newData, dataLoaded: true })
        }


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
                            reload: reload
                        })
                    }}>
                    <Card.Title title="Add Bill" />
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