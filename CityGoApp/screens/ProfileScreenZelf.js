import { render } from 'react-dom';
import * as React from 'react';
import {
  View,
  Text,
} from 'react-native';
import ProfileNavigation from './ProfileNavigation';

export default class ProfileScreenZelf extends React.Component{
    render(){
      return (
        <View style={{flex: 1}}>
          <ProfileNavigation />
        </View>
      );
    }
  }