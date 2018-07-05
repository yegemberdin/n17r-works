import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import Expo from 'expo';

const Bar = props => {
  const backIcon = !props.mainPage && (
    <Button onPress={props.closeAddFriendModal} style={styles.backButton} />
  );

  const fillButtonIcon = !props.mainPage && (
    <Button style={styles.backButton} />
  );

  return (
    <View style={styles.header}>
      {backIcon}
      <Text
        style={[
          styles.content,
          props.mainPage ? { marginLeft: 10 } : { textAlign: 'center' },
        ]}>
        {props.header}
      </Text>
      {fillButtonIcon}
    </View>
  );
};

export default Bar;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'pink',
    width: '100%',
    paddingBottom: 15,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  content: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    marginLeft: -15,
  },
});
