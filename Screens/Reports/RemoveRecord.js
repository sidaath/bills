import React from 'react'
import { View } from 'react-native'
import { Button, Card, Dialog, Headline, Paragraph, Portal } from 'react-native-paper'
import { removeRecord } from '../../Model/Payment'

export default function RemoveRecord({ route, navigation }) {

    const { billInstance, setBillData } = route.params

    //for dialog
    const [visible, setVisible] = React.useState(false)
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    //remove record from payment history
    const removeBillRecord = async () => {
        result = await removeRecord(billInstance)
        if (result !== false) {
            setBillData(result)
        }
        setVisible(false)
        navigation.goBack()
    }

    return (
        <View>
            <Card>
                <Card.Title title='Remove a record' subtitle='Remove a payment record' />
                <Card.Content>
                    <Headline>{billInstance.billName}</Headline>
                    <Paragraph>{`Payment Date\t\t\t\t : ${billInstance.paymentMonth}`}</Paragraph>
                    <Paragraph>{`Payment Amt\t\t\t\t : ${billInstance.payAmount}`}</Paragraph>
                    <Paragraph>{`Payment Method\t : ${billInstance.paymentMethod}`}</Paragraph>
                </Card.Content>
            </Card>
            <Button onPress={showDialog}>Remove Record</Button>

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Warning</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Remove record? This cannot be undone!</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>CLOSE</Button>
                        <Button onPress={removeBillRecord}>CONFIRM DELETE</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}