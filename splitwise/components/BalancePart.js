import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BalancePart = props => {
  return (
    <View style={styles.balancePart}>
      <Text style={{ color: props.textColor, fontSize: 10 }}>
        {props.heading}
      </Text>
      <Text style={{ color: props.color, fontSize: 10 }}>
        {props.money > 0}
        {props.money.toFixed(2)} ₸
      </Text>
    </View>
  );
};

export default BalancePart;

const styles = StyleSheet.create({
  balancePart: {
    alignItems: 'center',
  },
});
