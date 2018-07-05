import React from 'react';
import { View, TextInput, Text, StyleSheet, Platform } from 'react-native';

const InputField = props => {
  return (
    <View style={props.style}>
      <Text style={styles.name}>{props.label}</Text>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        style={styles.textInput}
        keyboardType={props.keyboardType}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    paddingBottom: 10,
    marginTop: 15,
    fontSize: 17,
    color: '#660066',
  },
  name: {
    fontSize: 17,
    color: '#3399ff',
  },
});
