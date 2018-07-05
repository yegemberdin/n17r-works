import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import FilmsScreen from '/FilmsScreen';
import DetailsScreen from '/DetailsScreen';
import {
  Button,
  Colors,
  Toolbar,
  ToolbarContent,
  ToolbarAction,
  TextInput,
} from 'react-native-paper';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  Platform,
  Text,
  FlatList,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

export const Context = React.createContext();

export class ModeProvider extends Component {
  state = {
    name: 'Dark',
    backColor: 'white',
    textColor: 'black',
  };
  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          changeMode: () => {
            this.setState({
              name: this.state.name === 'Dark' ? 'Light' : 'Dark',
              backColor: this.state.backColor === 'gray' ? 'black' : 'gray',
              textColor: this.state.textColor === 'black' ? 'white' : 'black',
            });
          },
        }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

const RootStack = createStackNavigator(
  {
    FilmsScreen: FilmsScreen,
    DetailsScreen: DetailsScreen,
  },
  {
    initialRouteName: 'FilmsScreen',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
