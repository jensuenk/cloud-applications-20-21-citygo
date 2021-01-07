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

const latitudeDelta = 0.0100
const longitudeDelta = 0.0080

const USER_ID = 2;

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

  /*registerForPushNotifications = async () =>{
    //Nagaan of de persmissions al toegekend waren
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let EindStatus = status;

    //Als er nog geen permissie gegeven is voor notificaties -> user vragen voor permissions
    if(status !== 'granted'){
      const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      EindStatus = status;
    }

    //Als er geen permissie gegeven wordt => de user heeft geen permissie gegeven om notificaties te sturen, dus de functie moet stoppen
    if(EindStatus !== 'granted'){
      //functie stoppen => return
      return;
    }

    //Om push notificaties te sturen => PUSH NOTIFICATION TOKEN nodig!
    let token = await Notifications.getExpoPushTokenAsync();
    console.log("Push token: ",token);

    //De unieke token toevoegen aan de Firebase
    let uid = Firebase.auth().currentUser.uid;
    Firebase.database().ref("users").child(uid).update({
      expoPushToken: token
    });
  }
  */

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
      userLocations: [],
      currentUser: null,
      notFoundItems: []
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

  ///Push Notifications in de call van 6/01/2021 gecanceld -> fout was totaal niet duidelijk en het was een nice to have
  /*
  //voor dat de render functie wordt uitgevoerd, gebeurd deze functie -> check of het een fysiek device is en of het OS android is
  //als het fysiek is en draait android -> getnotificationasync aangeroepen
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'You need to use a physical device to run with permissions.',
      });
    } else {
      this._getNotificationsAsync();
    }
  }

  _getNotificationsAsync = async () => {
    //check of er in het verleden reeds permissie werd gegeven - checken voor bestaande permissions
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    //checken voor nieuwe permissies -> IF NOT: alert dat er geen permissie is gevgeven aan de notificaties + stop functie
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    //voor de sessie een token aanmaken
    const token = (await Notifications.getExpoPushTokenAsync()).data;;
    console.log(token);

    //instellingen van de notificatie zelf
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }*/

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
    // TODO: change id to global
    this.getUserById(USER_ID);

    // TODO: uncomment
    //this.timer = setInterval(() => this.getAllUsersLocations(), 10000)
  }

  updateLocation() {
    this.state.notFoundItems.forEach(item => {
      // Check if item is in a radius of +-10m
      if (!(Math.abs(this.state.locatie.latitude - item.location.latitude) > 0.001 || Math.abs(this.state.locatie.longitude - item.location.longitude) > 0.001)) {
        console.log("You are near " + item.name)
      }
    })
  }

  async getUserById(id) {
    let resp = await fetch('https://citygoaspbackend20201224141859.azurewebsites.net/Users/' + id);
    let respJson = await resp.json();
    this.setState({ currentUser: respJson })

    this.apiCallSights();
    this.getAllUsersLocations();
    this.getItems();
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
      if (user.userId != this.state.currentUser.userId && user.location != null && user.online) {
        if (!(Math.abs(this.state.locatie.latitude - user.location.latitude) > 0.01 || Math.abs(this.state.locatie.longitude - user.location.longitude) > 0.01)) {
          userLocations.push(user);
        }
      }
    })
    this.setState({ userLocations: userLocations });
    this.updatePositionAPI();
  }

  async getItems() {
    let itemsResp = await fetch('https://citygoaspbackend20201224141859.azurewebsites.net/Items/');
    let itemsRespJson = await itemsResp.json();

    let userItemsResp = await fetch('https://citygoaspbackend20201224141859.azurewebsites.net/Users/' + this.state.currentUser.userId + '/Items')
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
    this.setState({ notFoundItems: notFoundItems })
    // TODO: Call more
    this.updateLocation();
  }
  async updatePositionAPI() {
    let user = this.state.currentUser;
    user.location.latitude = this.state.locatie.latitude,
    user.location.longitude = this.state.locatie.longitude
    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
    await fetch('https://citygoaspbackend20201224141859.azurewebsites.net/Users/', request)
      .then(function (response) {
        return response.json();
      })
      .catch(function (error) {
        //console.log("Update location error", error)
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
                title={user.username}
                description={user.name}
                coordinate={{
                  latitude: user.location.latitude,
                  longitude: user.location.longitude,
                }}
                image={require('../assets/user-icon.png')}
              />
            )),
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
            ))}
        </MapView>
      </View>
    );
  }
}