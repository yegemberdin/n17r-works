import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Modal,
  Platform,
  Dimensions
} from 'react-native';
import BalanceInfo from './components//BalanceInfo';
import FriendsEventsList from './components/FriendsEventsList';
import AddFriendModal from './components/AddFriendModal';
import AddBillModal from './components/AddBillModal';
import ChosenFriendModal from './components/ChosenFriendModal';
import Expo from 'expo';
import { Button } from 'react-native-elements';
import Bar from './components/Bar';

let { height, width } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    friends: [],
    income: 0,
    outcome: 0,
    addFriendScreenShow: false,
    addBillScreenShow: false,
    currentName: '',
    chosenFriend: null,
  };

  handleNameChange = event => {
    this.setState({
      currentName: event,
    });
  };

  showAddFriendModal = () => {
    this.setState({
      addFriendScreenShow: true,
    });
  };

  closeAddFriendModal = () => {
    this.setState({
      addFriendScreenShow: false,
    });
  };

  showAddBillModal = () => {
    this.setState({
      addBillScreenShow: true,
    });
  };

  closeAddBillModal = () => {
    this.setState({
      addBillScreenShow: false,
    });
  };

  saveFriend = () => {
    this.setState(prevState => {
      const newFriend = {
        name: this.state.currentName.trim(),
        money: 0,
        events: [],
      };
      return {
        currentName: '',
        friends: [...prevState.friends, newFriend],
      };
    });
    this.closeAddFriendModal();
  };

  updateFriends = (newFriends, { newIncome, newOutcome }) => {
    this.setState({
      friends: newFriends,
      income: newIncome,
      outcome: newOutcome,
      addBillScreenShow: false,
    });
  };

  handleChooseFriend = friend => {
    this.setState({
      chosenFriend: friend,
    });
  };

  closeChosenFriendModal = () => {
    this.setState({
      chosenFriend: null,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Bar mainPage={true} header="Splitwise" />
        <BalanceInfo income={this.state.income} outcome={this.state.outcome} />
        <FriendsEventsList
          friends={this.state.friends}
          onChooseFriend={this.handleChooseFriend}
        />
        <Button
          title="Add friends on splitwise"
          onPress={this.showAddFriendModal}
          buttonStyle={[styles.button, styles.blueButton]}
          textStyle={[styles.textStyle, { color: 'pink' }]}
          rightIcon={[styles.addFriendIcon]}
        />
        <Button
          title="Add a bill"
          onPress={this.showAddBillModal}
          buttonStyle={[styles.button]}
          textStyle={[styles.textStyle]}
          rightIcon={[styles.addBillIcon]}
          disabled={this.state.friends.length === 0}
        />
        <AddBillModal
          onRequestClose={this.closeAddBillModal}
          friends={this.state.friends}
          onUpdateFriends={this.updateFriends}
          income={this.state.income}
          outcome={this.state.outcome}
          visible={this.state.addBillScreenShow}
        />
        <AddFriendModal
          onNameChange={this.handleNameChange}
          currentName={this.state.currentName}
          onRequestClose={this.closeAddFriendModal}
          onSaveFriend={this.saveFriend}
          visible={this.state.addFriendScreenShow}
        />
        {this.state.chosenFriend && (
          <ChosenFriendModal
            visible={this.state.chosenFriend !== null}
            onRequestClose={this.closeChosenFriendModal}
            friend={this.state.chosenFriend}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    marginBottom: 10,
    borderRadius: 4,
  },
  textStyle: {
    fontWeight: '400',
    fontSize: 20,
  },
  blueButton: {
    backgroundColor: 'blue',
    marginTop: 10,
  },
  addFriendIcon: {
    name: 'person',
    color: 'pink',
  },
  addBillIcon: {
    name: 'add',
    color: 'pink',
  },
});
