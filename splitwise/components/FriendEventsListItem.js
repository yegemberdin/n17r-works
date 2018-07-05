import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import BalancePart from '/BalancePart';

const FriendEventsListItem = props => {
  let balancePart = <Text style={[styles.text]}>No expenses</Text>;

  if (props.money > 0) {
    balancePart = <BalancePart heading="Owes you" money={props.money} />;
  }

  if (props.money < 0) {
    balancePart = <BalancePart heading="You owe" money={props.money} />;
  }

  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={styles.friend}
      onPress={
        props.onChooseFriend
          ? props.onChooseFriend.bind(this, props.friend)
          : null
      }>
      <Text style={styles.name}>{props.name}</Text>
      {balancePart}
    </TouchableOpacity>
  );
};

export default FriendEventsListItem;

const styles = StyleSheet.create({
  friend: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    height: 57,
  },
  name: {
    fontSize: 17,
    fontWeight: '200',
    color: 'black',
  },
  text: {
    fontSize: 14,
  },
});
