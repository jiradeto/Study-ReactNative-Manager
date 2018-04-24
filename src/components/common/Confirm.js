import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import CardSection from './CardSection';
import Button from './Button';

export default (Confirm = ({ children, visible, onAccept, onDecline }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <CardSection style={styles.cardSection}>
          <Text style={styles.text}>{children}</Text>
        </CardSection>
        <CardSection>
          <View style={{ flex: 1 }}>
            <Button onPress={onAccept}>Yes</Button>
            <Button onPress={onDecline}>No</Button>
          </View>
        </CardSection>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  cardSection: {
    justifyContent: 'center'
  },
  text: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
});
