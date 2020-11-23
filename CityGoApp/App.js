/*import * as React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MapScreen from './screens/MapScreen';
import CameraScreen from './screens/CameraScreen';
import InventoryScreen from './screens/InventoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProfileScreenZelf from './screens/ProfileScreenZelf';




const TabNavigator = createMaterialBottomTabNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-map'} />
          </View>
        ),
      }
    },
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-camera'} />
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
            <Icon style={[{color: tintColor}]} size={25} name={'ios-images'} />
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
            <Icon style={[{color: tintColor}]} size={25} name={'ios-person'} />
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

export default createAppContainer(TabNavigator);*/


import React from 'react';
import Providers from './navigation';
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
import FirebaseConfig from "./config/Firebase.js";

// Add the Firebase services that you want to use
import "firebase/auth";

const App = () => {
  return <Providers />
}

export default App;