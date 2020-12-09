import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';


// Add the Firebase services that you want to use
import "firebase/auth";
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import CameraScreen from './screens/CameraScreen';
import InventoryScreen from './screens/InventoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProfileScreenZelf from './screens/ProfileScreenZelf';

export default class App extends React.Component{
  render(){
    return <AuthNavigator/>;
  }
}

const AuthSwitchNavigator = createSwitchNavigator({
  WelcomeScreen: WelcomeScreen,
  LoginScreen: LoginScreen,
  RegisterScreen: RegisterScreen,
  MainScreen: MainScreen,
},
{
  initialRouteName: 'WelcomeScreen',
});

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-map'} />
          </View>
        ),
      }
    },
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-camera'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#a3c2fa',
        barStyle: { backgroundColor: '#000000' },
      }
    },
    Inventory: {
      screen: InventoryScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-images'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#a3c2fa',
        barStyle: { backgroundColor: '#000000' },
      }
    },
    Profile: {
      screen: ProfileScreenZelf,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-person'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#a3c2fa',
        barStyle: { backgroundColor: '#000000' },
      }
    }
  },
  {
    initialRouteName: 'Map',
    activeColor: '#ffffff',
    inactiveColor: '#a3c2fa',
    barStyle: { backgroundColor: '#000000' },
  }
);

const ApplicationNavigator = createAppContainer(TabNavigator);
const AuthNavigator = createAppContainer(AuthSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
