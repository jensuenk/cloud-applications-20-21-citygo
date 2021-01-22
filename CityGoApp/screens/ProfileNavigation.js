import React from 'react'
import { View, Alert, Text, TextInput, StyleSheet } from 'react-native'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Polygon } from 'react-native-maps';
import { mapStyle } from './mapStyle';
import GeoFencing from 'react-native-geo-fencing';
import { TouchableOpacity } from 'react-native-gesture-handler';


import AddFriends from './AddFriends'
import ProfileScreen from './ProfileScreen'
import Friends from './Friends'
import Hangman from './Hangman'
import FriendRequest from './FriendRequests'
import LoginScreen from './LoginScreen'
import ProfilePicture from './ProfilePicture'


export default class ProfileNavigatoin extends React.Component{

constructor(props) {
    super(props);
    this.state =
    {
      componentSelected: 'One',
    }
  }

  changeComponent = (component) => {
    this.setState({ componentSelected: component });
  }

  renderComponent(component) {
    if (component == 'One') {
      return <ProfileScreen changeComponent={this.changeComponent} />
    } else if (component == 'Two') {
      return <AddFriends changeComponent={this.changeComponent} />
    } else if (component == 'Three') {
      return <Friends changeComponent={this.changeComponent} />
    } 
    else if (component == 'Four'){
      return <Hangman changeComponent = {this.changeComponent} />
    }
    else if (component == 'Five'){
      return <FriendRequest changeComponent = {this.changeComponent} />
    }
    else if (component == 'Six'){
      return <LoginScreen changeComponent = {this.changeComponent} />
    }
    else if (component == 'Seven'){
      return <ProfilePicture changeComponent = {this.changeComponent} />
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderComponent(this.state.componentSelected)}
      </View>
    );
  }
}