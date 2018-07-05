import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import Expo from 'expo';
import InputField from '/InputField';
import { Button } from 'react-native-elements';
import Bar from '/Bar';

let { height, width } = Dimensions.get('window');

const AddFriendModal = props => {
  return (
    <Modal
      onRequestClose={props.closeAddFriendModal}
      visible={props.visible}
      style={styles.modal}>
      <Bar
        closeAddFriendModal={props.closeAddFriendModal}
        header="Add a friend"
      />
      <View style={styles.container}>
        <InputField
          style={{ width: '100%' }}
          label="Name"
          value={props.currentName}
          onChangeText={props.onNameChange}
        />
        <Button
          title="Save"
          buttonStyle={styles.button}
          disabled={props.currentName.trim().length === 0}
          textStyle={styles.textStyle}
          onPress={props.saveFriend}
        />
      </View>
    </Modal>
  );
};

export default AddFriendModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    marginTop: 25,
    backgroundColor: 'blue',
    borderRadius: 6,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '800',
  },
});
