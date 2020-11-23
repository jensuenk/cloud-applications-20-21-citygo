import React from 'react'
import { View, Alert, Text, TextInput, StyleSheet } from 'react-native'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Polygon } from 'react-native-maps';
import { mapStyle } from './mapStyle';
import GeoFencing from 'react-native-geo-fencing';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapZelf from './MapZelf'
import QuestionScreen from './QuestionScreen';
import TicTacToe from './TicTacToe';
import MemoryGame from './MemoryGame';

const latitudeDelta = 0.0100
const longitudeDelta = 0.0080
const polygon = [
  { latitude: 3.1336599385978805, longitude: 101.31866455078125 },
  { latitude: 51.22369444, lnlongitudeg: 101.66198730468757 },
  { latitude: 3.091150714460597, longitude: 4.41138889 },
  { latitude: 3.1336599385978805, longitude: 101.31866455078125 } // last point has to be same as first point
];


export default class Map2 extends React.Component {

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
      return <MapZelf changeComponent={this.changeComponent} />
    } else if (component == 'Two') {
      return <QuestionScreen changeComponent={this.changeComponent} />
    } else if (component == 'Three') {
      return <TicTacToe changeComponent={this.changeComponent} />
    }else if (component == 'Four') {
      return <MemoryGame changeComponent={this.changeComponent} />
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






