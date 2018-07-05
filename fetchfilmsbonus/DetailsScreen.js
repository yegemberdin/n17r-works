import React, { Component } from 'react';
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
  ScrollView,
} from 'react-native';
import { Context, ModeProvider } from '/App';

export default class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: `${state.params.title}`,
    };
  };
  render() {
    const movie = this.props.navigation.getParam('movie');
    const set = this.props.navigation.getParam('set');
    return (
      <ModeProvider>
        <Context.Consumer>
          {context => (
            <View style={{ backgroundColor: set.backColor, flex: 1 }}>
              <View style={[styles.container]} />
              <ScrollView>
                <View style={[styles.container]} />
                <View style={[styles.container]}>
                  <Image
                    source={{ uri: movie['im:image'][2].label }}
                    style={[styles.image]}
                  />
                </View>
                <View style={[styles.container]}>
                  <Text style={{ color: set.textColor }}>
                    {movie['im:name'].label}
                  </Text>
                </View>
                <View style={[styles.container]}>
                  <Text style={{ color: set.textColor }}>Genre:</Text>
                  <Text style={{ color: set.textColor }}>
                    {movie.category.attributes.label}
                  </Text>
                </View>
                <View>
                  <Text style={{ color: set.textColor, textAlign: 'center' }}>
                    {'\n'}Summary
                  </Text>
                  <Text style={{ color: set.textColor, textAlign: 'center' }}>
                    {movie.summary.label}
                  </Text>
                </View>
              </ScrollView>
            </View>
          )}
        </Context.Consumer>
      </ModeProvider>
    );
  }
}

class DetailsContent extends React.Component {
  render() {
    return (
      <React.fragment>
        <View style={[styles.container]}>
          <Image
            source={{ uri: this.props.movie['im:image'][2].label }}
            style={[styles.image]}
          />
        </View>
        <View style={[styles.container]}>
          <Text>{this.props.movie['im:name'].label}</Text>
        </View>
        <View style={[styles.container]}>
          <Text>Genre:</Text>
          <Text>{this.props.movie.category.attributes.label}</Text>
        </View>
        <View>
          <Text style={[styles.text]}>{'\n'}Summary</Text>
          <Text style={[styles.text]}>{this.props.movie.summary.label}</Text>
        </View>
      </React.fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 200,
  },
  text: {
    textAlign: 'center',
  },
});
