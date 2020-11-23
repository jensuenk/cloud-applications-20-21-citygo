import React from 'react'
import { View, Alert, Text, TextInput, StyleSheet } from 'react-native'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Polygon } from 'react-native-maps';
import { mapStyle } from './mapStyle';
import GeoFencing from 'react-native-geo-fencing';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapZelf from './MapZelf'

const latitudeDelta = 0.0100
const longitudeDelta = 0.0080


export default class QuestionScreen extends React.Component {
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
      huidigeSightId: 0,
      vraag: "(Hier komt vraag van API)",
      antwoord: ""
    }
  }

  async componentDidMount() {
    //console.disableYellowBox = false;
    const test= await Permissions.askAsync(Permissions.LOCATION)
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
              console.warn(element.polygon)
              console.warn(this.state.coordinaten)
              // Dit is code om te zien of je in een bepaald polygon bent
              GeoFencing.containsLocation(this.state.coordinaten, element.polygon)
                // nu nog programmeren dat de bijgepaste challenge wordt geladen
                .then(() => {
                  this.setState({ huidigeSight: element.name })
                  this.setState({ huidigeSightId: element.sightId })
                  console.warn("yeeeeeeeeeeet")
                })
                .catch(
                  console.warn("niks in de buurt")
                )
            }

            this.apiCallChallenge(this.state.huidigeSightId);


          })
        }
      })

    this.apiCallSights();



  }

  async apiCallSights() {
    let resp2 = await fetch('https://citygo.azurewebsites.net/sights')
    let respJson2 = await resp2.json();
    this.setState({ sights: respJson2.sights })


  }

  async apiCallChallenge(id) { 
    let resp = await fetch('https://citygo.azurewebsites.net/sights/${encodeURIComponent(id)}/challenges')
    let respJson = await resp.json();
    this.setState({ vraag: respJson.challenge.task })
    this.setState({ antwoord: respJson.challenge.answer })
  }


  //Hier wordt de vraag weergegeven die opgehaald wordt uit de api
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>You are close to {this.state.huidigeSight}.</Text>
        <Text style={styles.question}>{this.state.vraag}</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Answer"
          onPress={text => onChangeText(text)}
        //value={value}
        />
        <TouchableOpacity style={styles.button1} onPress={() => this.props.changeComponent('One')}>
          <Text style={styles.btntext}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => this.props.changeComponent('One')}>
          <Text style={styles.btntext}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#36485f',
    paddingLeft: 50,
    paddingRight: 50
  },
  header: {
    fontSize: 30,
    color: '#fff',
    paddingBottom: 0,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#199187'
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#fff',
    borderColor: '#f8f8f8',
    borderBottomWidth: 1
  },
  question: {
    fontSize: 20,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 20,
  },
  button1: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginBottom: 30
  },
  button2: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#36485f',
    marginBottom: 30,
    borderColor: '#808080',
    borderWidth: 3
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold'
  }
})