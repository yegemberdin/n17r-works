import { Constants } from 'expo';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import { Button, ListItem, ListSection, Text } from 'react-native-paper';

const GET_ALL_RECIPES = gql`
{
  allRecipes {
    id
    title
    description
    instructions
    ingredients
  }
}
`;

export default class RecipeList extends React.Component {
  static navigationOptions = {
    title: 'MY cookBook',
    headerStyle: {
      backgroundColor: 'pink',
    },
    headerTintColor: 'gray',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  state = {
    refreshing: false,
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Query query={GET_ALL_RECIPES}>
          {({ loading, data, error, refetch }) =>
            loading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                keyExtractor={item => item.id}
                data={data.allRecipes}
                refreshing={loading}
                onRefresh={() => refetch()}
                renderItem={({ item }) => {
                  return (
                    <ListItem
                      title={item.title}
                      description={item.description}
                      onPress={() =>
                        this.props.navigation.push('DetailsScreen', {
                          recipe: item,
                        })
                      }
                    />
                  );
                }}
              />
            )
          }
        </Query>
        <Button
          small
          icon="add"
          style={{
            bottom: 20,
            right: 10,
            height: 75,
          }}
          onPress={() => this.props.navigation.push('CreateRecipeForm', {})}>
          Add recipe
        </Button>
      </View>
    );
  }
}
