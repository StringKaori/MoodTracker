import { StyleSheet, View, Modal, TouchableOpacity, Text} from 'react-native';

interface MoodifyModalType {
    shouldShowModal: boolean,
    toggleModal: () => void
}

export default function MoodifyModal(props: MoodifyModalType) {

    return (
        <Modal
         animationType="slide"
         transparent={ true }
         visible={ props.shouldShowModal }
         onRequestClose={ () => { props.toggleModal() } }>
            <View style={ styles.centeredView }>
                <View style={ styles.modalView }>
                    <TouchableOpacity
                     style={ [styles.button, styles.buttonClose] }
                     onPress={ () => props.toggleModal() }>
                        <Text style={ styles.textStyle }>X</Text>
                    </TouchableOpacity>
                    <Text style={ styles.modalText }>Moodify your day!</Text>
                </View>
            </View>
        </Modal>    
    );
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        // iOS
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        // Android
        elevation: 5,
        height: 500,
        width: '90%'
    },
    button: {
        position: 'absolute',
        top: 5,
        right: 10,
        borderRadius: 20,
        padding: 7
    },
    buttonClose: {
        backgroundColor: 'red',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
    },
});
