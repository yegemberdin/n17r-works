import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BalancePart from '/BalancePart';

const BalanceInfo = props => {
  return (
    <View style={styles.balanceInfo}>
      <BalancePart heading="You owe" money={-props.outcome} />
      <BalancePart heading="You are owed" money={props.income} />
      <BalancePart
        heading="Total Balance"
        money={props.income - props.outcome}
      />
    </View>
  );
};

export default BalanceInfo;

const styles = StyleSheet.create({
  balanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    borderBottomWidth: 0.7,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
