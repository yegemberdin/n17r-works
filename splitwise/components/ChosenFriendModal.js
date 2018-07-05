import React from 'react';
import FriendsEventsList from '/FriendsEventsList';
import Bar from '/Bar';
import { Modal, View } from 'react-native';

const ChosenFriendModal = props => {
  let preparedArray = [];
  const events = props.friend.events;

  for (let i = 0; i < events.length; i++) {
    preparedArray.push({
      name: events[i].eventName,
      money: events[i].money,
    });
  }

  return (
    <Modal
      visible={props.visible}
      onRequestClose={props.closeAddFriendModal}
      animationType="fade">
      <View style={{ alignItems: 'center', flex: 1, width: '100%' }}>
        <Bar
          closeAddFriendModal={props.closeAddFriendModal}
          header={props.friend.name}
        />
        <FriendsEventsList
          friends={preparedArray}
          disabled={true}
          chosenFriend={true}
        />
      </View>
    </Modal>
  );
};

export default ChosenFriendModal;
