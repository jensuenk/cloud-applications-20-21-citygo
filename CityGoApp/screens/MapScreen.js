/*import * as React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import {Dimensions} from 'react-native'

import { render } from 'react-dom';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Map from './Map';

let {width,height} = Dimensions.get("window")
const ASPECT_RATIO=width/height

const initialState={
  latitude: null,
  longitude: null,
  latitudeDelta: 0.0001,
  longitudeDelta: 0.0001,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default class MapScreen extends React.Component {


  componentDidMount() {
    Map.UseEffect();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  
  render(){
    return Map.currentPosition.latitude ?  (
      <MapView
      provider={PROVIDER_GOOGLE}
      style={{flex:1}}
      showsUserLocation
      
      initialRegion={currentPosition}
    />
    ) : <ActivityIndicator style={{flex:1}} animating size="large"></ActivityIndicator>
  };
  }
  */



import { render } from 'react-dom';
import * as React from 'react';
import {
  View,
  Text,
} from 'react-native';
import Map from './Map';

export default class MapScreen extends React.Component{
    render(){
      return (
        <View style={{flex: 1}}>
          <Map />
        </View>
      );
    }
  }