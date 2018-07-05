import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

const FlatBlock = props => {
  const keyExtractor = (item, index) => index;
  return (
    <View style={styles.block}>
      <Text style={styles.description}>{props.description}</Text>
      <FlatList
        data={props.data}
        keyExtractor={keyExtractor}
        renderItem={props.renderFriendItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

export default FlatBlock;

const styles = StyleSheet.create({
  block: {
    width: '85%',
    marginTop: 10,
  },
  description: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 7,
  },
});
