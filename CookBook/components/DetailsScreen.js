import { Constants } from 'expo';
import { StyleSheet, View, FlatList } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardCover,
  Title,
  Paragraph,
  ListSection,
  ListItem,
} from 'react-native-paper';
import { ActivityIndicator, Text, Share } from "react-native";

export default class DetailsScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'pink',
    },
    headerTintColor: 'gray',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  shareContent = titleTxt => {
    Share.share({
      message: 'Shared recipe',
      url: '',
      title: titleTxt,
    });
  };

  render() {
    return (
      <View>
        <Card>
          <CardContent>
            <Title>
              {this.props.navigation.getParam('recipe', 'no recipe').title}
            </Title>
            <Paragraph>
              {
                this.props.navigation.getParam('recipe', 'no recipe')
                  .description
              }
            </Paragraph>
            <Text
              style={styles.share}
              onPress={() =>
                this.shareContent(
                  this.props.navigation.getParam('recipe', 'no recipe').title
                )
              }>
              Share
            </Text>
            <ListSection title="Instructions">
              <FlatList
                data={
                  this.props.navigation.getParam('recipe', 'no recipe')
                    .instructions
                }
                keyExtractor={item => item}
                renderItem={item => {
                  return <ListItem title={item.item} />;
                }}
              />
            </ListSection>
            <ListSection title="Ingredients">
              <FlatList
                data={
                  this.props.navigation.getParam('recipe', 'no recipe')
                    .ingredients
                }
                keyExtractor={item => item}
                renderItem={item => {
                  return <ListItem title={item.item} />;
                }}
              />
            </ListSection>
          </CardContent>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  share: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50,
    alignSelf: 'flex-end',
  },
});
