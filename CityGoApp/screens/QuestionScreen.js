import React from 'react'
import { View, Alert, Text, TextInput, StyleSheet,ToastAndroid } from 'react-native'
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
      antwoord: "",
      juistantwoord:""
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
              if(this._isInPolygon(this.state.coordinaten,element.coordinates))
              {
                this.setState({ huidigeSightNaam: element.name })
                this.setState({ huidigeSightId: element.sightId })
              }



            }

            this.apiCallChallenge(this.state.huidigeSightId);


          })
        }
      })

    this.apiCallSights();



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

  async apiCallSights() {
    let resp2 = await fetch('https://citygoaspbackend20201120025600.azurewebsites.net/sights')
    let respJson2 = await resp2.json();
    this.setState({ sights: respJson2.sights })


  }

  async apiCallChallenge(id) { 
    let url='https://citygoaspbackend20201120025600.azurewebsites.net/sights/'+id+'/challenges';
    let resp = await fetch(url)
    let respJson = await resp.json();
    this.setState({ vraag: respJson.challenges[0].task })
    this.setState({ juistantwoord: respJson.challenges[0].answer })
  }

  confirm=()=>{
    // feedback werkt enkel voor android via toast
    if(this.state.antwoord==this.state.juistantwoord){

      const putMethod = {
        method: 'PUT', // Method itself
        headers: {
         'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: {}
       }
       
       // make the HTTP put request using fetch api
       // voorlopig hardcoded, kan wanneer login af is
       fetch("https://citygoaspbackend20201120025600.azurewebsites.net/users/1/challenges/1", putMethod)
       .then(response => response.json())
       .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
       .catch(err => console.log(err)) // Do something with the error


      this.props.changeComponent('One')
      ToastAndroid.show("Congratulations!", ToastAndroid.LONG);
    }
    else{
      ToastAndroid.show("Wrong answer!", ToastAndroid.LONG);
    }

  }

  antwoordtekst=(tekst)=>{
    this.setState({ antwoord: tekst })

  }


  //Hier wordt de vraag weergegeven die opgehaald wordt uit de api
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>You are close to {this.state.huidigeSightNaam}.</Text>
        <Text style={styles.question}>{this.state.vraag}</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Answer"
          onChangeText={this.antwoordtekst}
        //value={value}
        />
        <TouchableOpacity style={styles.button1} onPress={this.confirm}>
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