import React from 'react'
import { ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import { Button, Card, Dialog, Paragraph, Portal } from 'react-native-paper'
import { removeBill } from '../../Model/BillModel'
import { getRecordNumbers } from '../../Model/Payment'

class RemoveBill extends React.Component {
    constructor(props) {
        super(props)
        this.state = { dataLoaded: false, showDialog: false, removeName : '' }
    }

    async componentDidMount() {
        try {
            const paymentRecords = await getRecordNumbers()
            this.setState({ paymentRecords: paymentRecords, dataLoaded: true })
        } catch (e) {
            console.log("RemoveBill.js, L18 ERROR : ", e)
        }
    }

    render() {
        const handleDelete = async () => {
            removeBill(this.state.removeName).then((res) => {
                if (res) {
                    this.props.navigation.navigate('Home', {
                        reload : true
                    })
                }
            })
        }

        if (!this.state.dataLoaded) {
            return (
                <ActivityIndicator size='large' />
            )
        }

        return (
            <ScrollView>
                {this.state.paymentRecords.map((record) => {
                    return (
                        <Card key={record.billName} style={styles.card}>
                            <Card.Title title={record.billName} />
                            <Card.Content>
                                <Paragraph>{`Total records : ${record.total}`}</Paragraph>
                            </Card.Content>
                            <Card.Actions>
                                <Button onPress={() => this.setState({showDialog : true, removeName:record.billName})}>Delete</Button>
                            </Card.Actions>
                        </Card>
                    )
                })}
                <Portal>
                    <Dialog visible={this.state.showDialog}>
                        <Dialog.Title>Confirm Action</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Deleting will remove all records. Confirm to proceed.</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => handleDelete()}>CONFIRM</Button>
                            <Button onPress={()=>{this.setState({showDialog : false})}}>CANCEL</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    card: {
        margin: 10
    }
})

export default RemoveBill