import React, { Component } from 'react';

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
  ScrollView,
} from 'react-native';
import { Context, ModeProvider } from '/App';

export default class FilmsScreen extends React.Component {
  state = {
    films: [],
    navprops: this.props.navigation,
  };

  loadfilms = () => {
    return fetch(
      'http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topMovies/limit=10/json'
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          films: responseJson.feed.entry,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.loadfilms();
  }

  render() {
    return (
      <ModeProvider>
        <Context.Consumer>
          {context => (
            <View style={{ backgroundColor: context.state.backColor, flex: 1 }}>
              <View style={[styles.container]}>
                <TouchableOpacity onPress={context.changeMode}>
                  <Text style={{ color: context.state.textColor }}>
                    {context.state.name}
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView>
                {this.state.films.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('Details', {
                          movie: this.state.films[index],
                          title: item['im:name'].label,
                          set: context.state,
                        })
                      }
                      style={[styles.details]}>
                      <Image
                        source={{ uri: item['im:image'][2].label }}
                        style={[styles.image]}
                      />
                      <View style={[styles.text]}>
                        <Text style={{ color: context.state.textColor }}>
                          {item['im:name'].label}
                        </Text>
                        <Text style={{ color: context.state.textColor }}>
                          {item['im:artist'].label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </Context.Consumer>
      </ModeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
    margin: 25,
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 200,
  },
  text: {
    marginHorizontal: 20,
  },
});
