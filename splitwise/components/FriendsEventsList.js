import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FriendEventsListItem from '/FriendEventsListItem';

const FriendsEventsList = props => {
  const keyExtractor = (item, index) => String(index);
  const renderItem = ({ item }) => {
    return (
      <FriendEventsListItem
        name={item.name}
        money={item.money}
        friend={item}
        onChooseFriend={props.onChooseFriend}
        disabled={props.disabled}
      />
    );
  };

  return (
    <FlatList
      style={styles.flatList}
      data={props.friends}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

export default FriendsEventsList;

const styles = StyleSheet.create({
  flatList: {
    width: '100%',
  },
});
