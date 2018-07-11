import { Constants } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import RecipeList from './components/RecipeList'
import DetailsScreen from './components/DetailsScreen'
import CreateRecipeForm from './components/CreateRecipeForm'
import { Provider as PaperProvider } from 'react-native-paper';


export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <PaperProvider>
          <RootStack />
        </PaperProvider>
      </ApolloProvider>
    )
  }
}

const RootStack = createStackNavigator(
  {
    RecipeList: RecipeList,
    DetailsScreen: DetailsScreen,
    CreateRecipeForm: CreateRecipeForm,
  },
  {
    initialRouteName: 'RecipeList',
  }
);


const client = new ApolloClient({
  //uri: 'https://api.graph.cool/simple/v1/cjj6owpa63wa80120j4n1jeov'
})
