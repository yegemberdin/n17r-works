import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import Expo from 'expo';
import FriendSelectorItem from '/FriendSelectorItem';
import FlatBlock from '/FlatBlock';
import InputField from '/InputField';
import { Button } from 'react-native-elements';
import Bar from '/Bar';

let { height, width } = Dimensions.get('window');
const MYSELF_INDEX = -1;

export default class AddBillModal extends React.Component {
  state = {
    involvedFriendIndexes: [],
    paidFriendIndex: null,
    amount: 0,
    description: '',
  };

  handleToggleInvolvedFriend = index => {
    const involved = this.state.involvedFriendIndexes.includes(index);

    this.setState(
      prevState =>
        involved
          ? {
              involvedFriendIndexes: [
                ...prevState.involvedFriendIndexes,
                index,
              ],
            }
          : {
              involvedFriendIndexes: prevState.involvedFriendIndexes.filter(
                involvedFriendIndex => involvedFriendIndex !== index
              ),
              paidFriendIndex:
                prevState.paidFriendIndex === index
                  ? null
                  : prevState.paidFriendIndex,
            }
    );
  };

  renderFriendSelectorItem = ({ item, index }) => {
    return (
      <FriendSelectorItem
        name={item.name}
        onPress={this.handleToggleInvolvedFriend(index)}
        involvedFriendIndexes={this.state.involvedFriendIndexes}
        index={index}
      />
    );
  };

  handlePaid = index => {
    this.setState({
      paidFriendIndex: index,
    });
  };

  renderPaidFriendItem = ({ item }) => {
    return (
      <FriendSelectorItem
        name={item === -1 ? 'You' : this.props.friends[item].name}
        onPress={this.handlePaid.bind(item)}
        paidFriendIndex={this.state.paidFriendIndex}
        index={item}
      />
    );
  };

  amountChangeHandler = value => {//не смогла, так как я эти два хандлера вызываю е в двух разнвых местах
    this.setState({
      amount: value,
    });
  };

  descriptionChangeHandler = value => {
    this.setState({
      description: value,
    });
  };

  handleAddBill = () => {
    const paidByMe = this.state.paidFriendIndex === MYSELF_INDEX;
    const amountPerPerson =
      this.state.amount / this.state.involvedFriendIndexes.length;

    const newFriends = this.props.friends.map(friend => {
      const moneyDelta = paidByMe ? amountPerPerson : -amountPerPerson;

      return {
        ...friend,
        money: friend.money + moneyDelta,
        events: [
          ...this.props.friends.events,
          {
            money: moneyDelta,
            eventName: this.state.description,
          },
        ],
      };
    });
    const newIncome =
      this.props.income + (paidByMe ? this.state.amount - amountPerPerson : 0);
    const newOutcome = this.props.outcome + (paidByMe ? 0 : amountPerPerson);

    this.props.updateFriends(newFriends, { newIncome, newOutcome });
  };

  render() {
    const isDisabled =
      this.state.paidFriendIndex === null ||
      this.state.involvedFriendIndexes.length === 0 ||
      this.state.amount === 0 ||
      this.state.description.trim().length === 0;

    return (
      <Modal
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}
        style={styles.container}
        animationType="fade">
        <Bar
          closeAddFriendModal={this.props.onRequestClose}
          header="Add a bill"
        />
        <ScrollView>
          <KeyboardAvoidingView
            enabled
            behavior="position"
            contentContainerStyle={{ flex: 1 }}
            style={{ flex: 1 }}
            keyboardVerticalOffset={8}>
            <View style={styles.container}>
              <FlatBlock
                description="Involved friends"
                data={this.props.friends}
                renderFriendItem={this.renderFriendSelectorItem}
              />
              <FlatBlock
                description="Who paid?"
                data={[-1, ...this.state.involvedFriendIndexes]}
                renderFriendItem={this.renderPaidFriendItem}
              />
              <InputField
                value={this.state.amount}
                onChangeText={this.amountChangeHandler}
                label="Amount"
                style={[styles.amount]}
                keyboardType="numeric"
              />
              <InputField
                value={this.state.description}
                onChangeText={this.descriptionChangeHandler}
                label="Description"
                style={[styles.description]}
              />
              <Button
                title="Submit"
                buttonStyle={styles.button}
                disabled={isDisabled}
                textStyle={styles.textStyle}
                rightIcon={{ name: 'create' }}
                onPress={this.handleAddBill}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
  },
  button: {
    borderRadius: 6,
    marginTop: 60,
    marginBottom: 20,
    backgroundColor: 'blue',
  },
  textStyle: {
    fontWeight: '800',
    fontSize: 16,
  },
  description: {
    marginTop: 25,
    width: '85%',
  },
  amount: {
    marginTop: 25,
    width: '85%',
  },
});
