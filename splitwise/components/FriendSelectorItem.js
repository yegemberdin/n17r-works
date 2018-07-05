import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const FriendSelectorItem = props => {
  let checked = false; //что то не очень понаяла ваш коммент здесь

  for (let i = 0; i < props.involvedFriendIndexes.length; i++) {
    if (props.involvedFriendIndexes[i] === props.index) checked = true;
  }

  return (
    <TouchableOpacity style={styles.info} onPress={props.onPress}>
      <Text style={styles.name}>{props.name}</Text>
      {checked && <Icon name="check" size={28} color="red" />}
    </TouchableOpacity>
  );
};

export default FriendSelectorItem;

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontSize: 22,
  },
});
