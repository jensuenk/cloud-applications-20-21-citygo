import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Add the Firebase services that you want to use
import "firebase/auth";
import AuthNavigator from './navigation/AuthStack';
import ApplicationNavigator from './navigation/AppStack';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './navigation/Routes';

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        {global.Myuser ? <ApplicationNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});