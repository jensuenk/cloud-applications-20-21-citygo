import React from 'react'
import { View, Alert, Text, TextInput, StyleSheet } from 'react-native'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Polygon } from 'react-native-maps';
import { mapStyle } from './mapStyle';
import GeoFencing from 'react-native-geo-fencing';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Notifications } from 'expo-notifications';
import Firebase from '../config/Firebase';
import Constants from 'expo-constants';
import LoginScreen from './LoginScreen';

const latitudeDelta = 0.0100
const longitudeDelta = 0.0080

export default class Mapke extends React.Component {

  alertChallenge(sight) {
    let alreadyCanceled = false;
    this.state.sightDialogsCanceled.forEach(canceledSight => {
      if (canceledSight.sightId == sight.sightId) {
        alreadyCanceled = true;
      }
    });
    if (!alreadyCanceled) {
      Alert.alert(
        "ALERT",
        "You are nearby " + sight.name + ", do you want to do the challenge?",
        [
          {
            text: "No",
            onPress: () => (
              this.state.sightDialogsCanceled.push(sight),
              this.sightAlertIsActive = false
            )
          },
          {
            text: "Yes",
            onPress: () => (
              this.props.changeComponent(sight.challenges[0].task),
              this.sightAlertIsActive = false
            )
          }
        ],
        { cancelable: false }
      );
    }
    else {
      this.sightAlertIsActive = false;
    }
  }

  alertItem(item) {
    let alreadyCanceled = false;
    this.state.itemDialogsCanceled.forEach(canceledItem => {
      if (canceledItem.itemId == item.itemId) {
        alreadyCanceled = true;
      }
    });
    if (!alreadyCanceled) {
      Alert.alert(
        "Item Nearby",
        "You found an item! Would you like to catch it?",
        [
          {
            text: "No",
            onPress: () => (
              this.state.itemDialogsCanceled.push(item),
              this.itemAlertIsActive = false
            )
          },
          {
            text: "Yes",
            onPress: () => (
              this.props.setCollectItem(item),
              this.props.changeComponent('catch'),
              this.itemAlertIsActive = false
            )
          }
        ],
        { cancelable: false }
      );
    }
    else {
      this.itemAlertIsActive = false;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      location: {
        latitude: 0,
        longitude: 0,
        latitudeDelta,
        longitudeDelta,
      },
      coordinates: {
        latitude: 0,
        longitude: 0
      },
      sights: [],
      huidigeSightNaam: "",
      sightMarkers: [{
        coordinates: {
          latitude: 3.148561,
          longitude: 101.652778
        },
        title: "",
        sight: null
      }],
      userLocations: [],
      currentUser: null,
      notFoundItems: [],
      notCompletedSights: [],
      itemDialogsCanceled: [],
      sightDialogsCanceled: [],
      soortchallenge: ""
    }
    this.locationWatcher = null;
    this.spawnInterval = null;
  }

  componentDidMount() {
    Permissions.askAsync(Permissions.LOCATION)
      .then(permission => {
        if (permission.status === 'granted') {
          this.locationWatcher = Location.watchPositionAsync({
            enableHighAccuracy: true,
            timeInterval: 500,
          }, (location) => {
            console.log(location.coords.latitude, location.coords.longitude)
            this.setState({
              location: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta,
                longitudeDelta,
              },
              coordinates: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }
            })
          })
        }
      })
    this.getUserById(global.uid);

    this.locationTimer = setInterval(() => this.getAllUsersLocations(), 10000)
    this.itemTimer = setInterval(() => this.getItems(), 10000);
    this.sightTimer = setInterval(() => this.getSights(), 10000);

    this.setState({ itemDialogsCanceled: [] })
  }

  componentWillUnmount() {
    clearInterval(this.sightTimer);
    clearInterval(this.itemTimer);
    clearInterval(this.locationTimer);
    // Set last location of player + set status to offline
    this.updatePositionAPI(false);
  }

  updateLocation() {
    this.locationWatcher = Location.watchPositionAsync({
      enableHighAccuracy: true
    }, (location) => {
      this.setState({
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta,
          longitudeDelta,
        }
      })
    });
  }

  async getUserById(id) {
    let resp = await fetch('https://citygo-ap.azurewebsites.net/Users/' + id);
    let respJson = await resp.json();
    this.setState({ currentUser: respJson })

    this.getAllUsersLocations();
    this.getItems();
    this.getSights();
  }

  async getAllUsersLocations() {
    this.updateLocation();
    let resp = await fetch('https://citygo-ap.azurewebsites.net/Users')
    let respJson = await resp.json();

    let userLocations = [];
    respJson.users.forEach(user => {
      if (user.userId != this.state.currentUser.userId && user.location != null && user.online) {
        if (!(Math.abs(this.state.location.latitude - user.location.latitude) > 0.01 || Math.abs(this.state.location.longitude - user.location.longitude) > 0.01)) {
          userLocations.push(user);
        }
      }
    })
    this.setState({ userLocations: userLocations });
    this.updatePositionAPI(true);
  }

  async getItems() {
    let itemsResp = await fetch('https://citygo-ap.azurewebsites.net/Items/');
    let itemsRespJson = await itemsResp.json();

    let userItemsResp = await fetch('https://citygo-ap.azurewebsites.net/Users/' + this.state.currentUser.userId + '/Items')
    let userItemsRespJson = await userItemsResp.json();

    let notFoundItems = [];
    itemsRespJson.items.forEach(item => {
      let add = true;
      userItemsRespJson.usersItems.forEach(userItem => {
        if (item.itemId == userItem.item.itemId) {
          add = false;
        }
      })
      if (add) {
        notFoundItems.push(item);
      }
    })
    this.setState({ notFoundItems: notFoundItems });
    this.alertNearbyItems();
  }

  alertNearbyItems() {
    this.state.notFoundItems.forEach(item => {
      // Check if item is in a radius of +-10m
      if (!(Math.abs(this.state.location.latitude - item.location.latitude) > 0.001 || Math.abs(this.state.location.longitude - item.location.longitude) > 0.001)) {
        if (!this.itemAlertIsActive) {
          this.itemAlertIsActive = true;
          this.alertItem(item);
        }
      }
    });
  }

  async getSights() {
    let sightsResp = await fetch('https://citygo-ap.azurewebsites.net/Sights/');
    let sightsRespJson = await sightsResp.json();

    let notCompletedSights = [];
    let userResp = await fetch('https://citygo-ap.azurewebsites.net/Users/' + global.uid);
    let userRespJson = await userResp.json();
    sightsRespJson.sights.forEach(sight => {
      let add = true;
      userRespJson.usersChallenges.forEach(collectedChallenge => {
        if (sight.challenges[0] == null || sight.challenges[0].challengeId == collectedChallenge.challenge.challengeId) {
          add = false;
        }
      });
      if (add) {
        notCompletedSights.push(sight);
      }
    });
    this.setState({ notCompletedSights: notCompletedSights });

    this.createSightsMarkers(sightsRespJson.sights);
    this.alertNearbySights();
  }

  createSightsMarkers(sights) {
    let markers = [];
    sights.forEach(sight => {
      // Get middle poit of polygon
      let x = sight.coordinates.map(c => c.latitude)
      let y = sight.coordinates.map(c => c.longitude)
      let minX = Math.min.apply(null, x)
      let maxX = Math.max.apply(null, x)
      let minY = Math.min.apply(null, y)
      let maxY = Math.max.apply(null, y)

      markers.push({
        coordinates: {
          latitude: (minX + maxX) / 2,
          longitude: (minY + maxY) / 2,
        },
        title: sight.name,
        sight: sight
      })
    })
    this.setState({ sightMarkers: markers })
  }

  alertNearbySights() {
    this.state.notCompletedSights.forEach(sight => {
      if (this.isInPolygon(this.state.coordinates, sight.coordinates)) {
        if (!this.sightAlertIsActive) {
          this.sightAlertIsActive = true;
          this.alertChallenge(sight);
        }
      }
    });
  }

  async updatePositionAPI(online) {
    let resp = await fetch('https://citygo-ap.azurewebsites.net/Users/' + global.uid);
    let respJson = await resp.json();
    this.setState({ currentUser: respJson })
    let user = this.state.currentUser;
    user.online = online;
    delete user.usersItems;
    delete user.usersChallenges;
    delete user.friends;
    delete user.userFriends;
    if (user.location == null) {
      user.location = {
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude
      }
    }
    else {
      user.location.latitude = this.state.location.latitude,
        user.location.longitude = this.state.location.longitude
    }
    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
    await fetch('https://citygo-ap.azurewebsites.net/Users/', request)
      .then(function (response) {
        return response.json();
      })
      .catch(function () {
      })
  }

  isInPolygon = (point, polygonArray) => {
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
    return inside;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <MapView
          region={this.state.location}
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
          {
            this.state.sightMarkers.map((sightMarker) => (
              <MapView.Marker
                title={sightMarker.title}
                coordinate={{
                  latitude: sightMarker.coordinates.latitude,
                  longitude: sightMarker.coordinates.longitude,
                }}
                onPress={() => this.alertChallenge(sightMarker.sight)}
              />
            ))
          }
          {
            this.state.userLocations.map((user) => (
              <MapView.Marker
                key={user.userId}
                title={user.username}
                description={user.name}
                coordinate={{
                  latitude: user.location.latitude,
                  longitude: user.location.longitude,
                }}
                image={require('../assets/user-icon.png')}
              />
            ))
          }
          {
            // Uncomment to visualize items on the map
            /*
            this.state.notFoundItems.map((item) => (
              <MapView.Marker
                title={item.name}
                description={item.rarity}
                coordinate={{
                  latitude: item.location.latitude,
                  longitude: item.location.longitude,
                }}
                pinColor={'blue'}
              />
            ))
            */
          }
        </MapView>
      </View>
    );
  }
}