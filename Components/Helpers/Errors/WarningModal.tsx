import React from 'react';
import { View, Text, Button, StyleSheet, Modal, ModalProps } from 'react-native';

interface WarningModalProps {
    visible?: boolean,
    onClose: () => void,
    message: string
}

export default function WarningModal(props: WarningModalProps)  {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={props.visible}
      onRequestClose={props.onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.warningText}>{ props.message }</Text>
          <Button title="Close" onPress={props.onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  warningText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
