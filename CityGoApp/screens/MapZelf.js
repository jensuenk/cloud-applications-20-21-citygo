import React from 'react'
import { View, Alert, Text, TextInput, StyleSheet } from 'react-native'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Polygon } from 'react-native-maps';
import { mapStyle } from './mapStyle';
import GeoFencing from 'react-native-geo-fencing';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { List } from 'native-base';

const latitudeDelta = 0.0100
const longitudeDelta = 0.0080


export default class Mapke extends React.Component {

  AlertChallenge() {
    Alert.alert(
      "ALERT",
      "You are nearby " + this.state.huidigeSightNaam + ", do you want to do a challenge?",
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
      },
      sights: [],
      huidigeSightNaam: "(Naam van plaats)",
      markers: [{
        title: "test",
        coordinates: {
          latitude: 3.148561,
          longitude: 101.652778
        },
      }],
      userLocations: []
    }

    this.locationWatcher = null
    this.spawnInterval = null

  }

  // Om middelpunt van polygon te krijgen
  coordinate(sight) {
    let x = sight.coordinates.map(c => c.latitude)
    let y = sight.coordinates.map(c => c.longitude)

    let minX = Math.min.apply(null, x)
    let maxX = Math.max.apply(null, x)

    let minY = Math.min.apply(null, y)
    let maxY = Math.max.apply(null, y)

    const _coordinates = this.state.markers
    _coordinates.push({
      coordinates: {
        latitude: (minX + maxX) / 2,
        longitude: (minY + maxY) / 2,
      },
      title: sight.name
    })
    this.setState({ markers: _coordinates })
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

            for (let element of this.state.sights) {

              if (this._isInPolygon(this.state.coordinaten, element.coordinates)) {
                this.setState({ huidigeSightNaam: element.name })
                this.setState({ huidigeSightId: element.sightId })
                this.AlertChallenge();
              }

            }

            this.state.sights.forEach(sight => {
              this.coordinate(sight)
            });

            console.log(this.state.markers)
          })

        }
      })

    this.apiCallSights();
    this.getAllUsersLocations();


    this.timer = setInterval(() => this.getAllUsersLocations(), 10000)
  }

  async apiCallSights() {
    let resp2 = await fetch('https://citygoaspbackend20201224141859.azurewebsites.net/sights')
    let respJson2 = await resp2.json();
    this.setState({ sights: respJson2.sights })


  }

  async getAllUsersLocations() {
    let resp = await fetch('https://citygoaspbackend20201224141859.azurewebsites.net/Users')
    let respJson = await resp.json();

    let userLocations = [];
    respJson.users.forEach(user => {
      if (user.email != "jens.uenk@icloud.com" && user.location != null && user.online) {
        userLocations.push(user);
      }
    })
    this.setState({ userLocations: userLocations });
    this.updatePositionAPI();
  }

  async updatePositionAPI() {
    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 1,
        location: {
          latitude: this.state.locatie.latitude,
          longitude: this.state.locatie.longitude
        },
        online: true
      })
    };
    await fetch('https://citygoaspbackend20201224141859.azurewebsites.net/Users/', request)
    .then(function(response){
      return response.json();
    })
    .catch(function(error) {
      console.log("Update location error", error)
    })
  }

  _isInPolygon = (point, polygonArray) => {

    let x = point.latitude
    let y = point.longitude

    let inside = false
    for (let i = 0, j = polygonArray.length - 1; i < polygonArray.length; j = i++) {
      let xLat = polygonArray[i].latitude
      let yLat = polygonArray[i].longitude
      let xLon = polygonArray[j].latitude
      let yLon = polygonArray[j].longitude

      let intersect = ((yLat > y) !== (yLon > y)) && (x < (xLon - xLat) * (y - yLat) / (yLon - yLat) + xLat)
      if (intersect) inside = !inside
    }
    return inside
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
          {this.state.markers.map((marker) => (
            <MapView.Marker
              title={marker.title}
              coordinate={{
                latitude: marker.coordinates.latitude,
                longitude: marker.coordinates.longitude,
              }}
            />
          )),
            this.state.userLocations.map((user) => (
              <MapView.Marker
                title={user.name}
                coordinate={{
                  latitude: user.location.latitude,
                  longitude: user.location.longitude,
                }}
              />
            ))}
        </MapView>
      </View>
    );
  }
}