import React from 'react'
import { View, Alert, Text, TextInput, StyleSheet } from 'react-native'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Polygon } from 'react-native-maps';
import { mapStyle } from './mapStyle';
import GeoFencing from 'react-native-geo-fencing';
import { TouchableOpacity } from 'react-native-gesture-handler';

const latitudeDelta = 0.0100
const longitudeDelta = 0.0080
const polygon = [
  { latitude: 3.1336599385978805, longitude: 101.31866455078125 },
  { latitude: 51.22369444, lnlongitudeg: 101.66198730468757 },
  { latitude: 3.091150714460597, longitude: 4.41138889 },
  { latitude: 3.1336599385978805, longitude: 101.31866455078125 } // last point has to be same as first point
];


export default class Mapke extends React.Component {
    AlertChallenge() {
      Alert.alert(
        "ALERT",
        "You are nearby a sight, do you want to do a challenge?",
        [
          {
            text: "Cancel",
            onPress: () => console.log(""),
            style: "cancel"
          },
          // nu standaard naar 2 maar moet van api komen naar wat soort vraag het moet gaan
          { text: "OK", onPress: () => (this.props.changeComponent('Two')) }
        ],
        { cancelable: false }
      );
    }
  
    constructor(props) {
      super(props);
      this.state = {
        locatie: {
          latitude: 0,
          longitude: 0,
          latitudeDelta,
          longitudeDelta,
        },
        coordinaten: {
          latitude: 0,
          longitude: 0
        }
      }
  
      this.locationWatcher = null
      this.spawnInterval = null
  
    }
  
    componentDidMount() {
      Permissions.askAsync(Permissions.LOCATION)
        .then(permission => {
          if (permission.status === 'granted') {
            this.locationWatcher = Location.watchPositionAsync({
              enableHighAccuracy: true,
              timeInterval: 500,
            }, (location) => {
              this.setState({
                locatie: {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta,
                  longitudeDelta,
                },
                coordinaten: {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }
              })
            })

            let point = {
              lat: 2.951269758090068,
              lng: 101.964111328125
            };
  
            // Dit is code om te zien of je in een bepaald polygon bent
            GeoFencing.containsLocation(point, polygon)
              .then(() => this.AlertChallenge())
              //.catch(() => this.AlertChallenge())
          }
        })
    }
  
    render() {
      return (
        <View style={{ flex: 1 }}>
  
          <MapView
            region={this.state.locatie}
            style={{ flex: 1 }}
            showsUserLocation
            scrollEnabled={false}
            zoomEnabled={false}
            rotateEnabled={false}
            showsTraffic={false}
            showsIndoors={false}
            customMapStyle={mapStyle}
            showsPointsOfInterest={false}
          >
            <Marker //de prof
              coordinate={{
                latitude: 51.22369444,
                longitude: 4.41138889,
              }} />
  
          </MapView>
        </View>
      );
    }
  }