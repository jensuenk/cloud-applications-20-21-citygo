import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableHighlight, Alert } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Svg, { Circle, Rect, Line, G } from 'react-native-svg';

//DONE:
// - TEKENEN VAN DE GALG
// - PLAATSEN VAN HET TOESTENBORD
// - VALIDEREN VAN DE OP GEDRUKTE LETTER
// - PLAATSEN VAN DE GALG 
// - TEKENEN VAN HET MANNETJE --> doen door de waarde van wrond te checken --> if wrong 1: teken hoofd blablabla

//TODO: 
// - foto url van de api verkrijgen 
// - antwoorden  van de api verkrijgen 
// - 


export default class Hangman extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "answer": "test",
      "hint": "test",
      "correct": 0,
      "wrong": 0,
      "usedLetters": [],
      "lettersLeft": [],
      "input": "",
      currentUser: null,
      sights: [],
      /*locatie: {
        latitude: 0,
        longitude: 0,
        latitudeDelta,
        longitudeDelta,
      },*/
      coordinaten: {
        latitude: 0,
        longitude: 0
      },
      huidigeSightNaam: "(Naam van plaats)",
      huidigeSightId: 0,
      vraag: "(Hier komt vraag van API)",
      antwoord: "",
      juistantwoord: "",
      id: 0,
    }

  }

  async getUserById(id) {
    let resp = await fetch('https://citygo-ap.azurewebsites.net/Users/' + id);
    let respJson = await resp.json();
    this.setState({ currentUser: respJson });
  }

  async componentDidMount() {
    this.getUserById(global.uid);
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    const test = await Permissions.askAsync(Permissions.LOCATION)
      .then(permission => {
        if (permission.status === 'granted') {
          this.locationWatcher = Location.watchPositionAsync({
            enableHighAccuracy: true,
            timeInterval: 500,
          }, (location) => {
            this.setState({
              /*locatie: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta,
                longitudeDelta,
              },*/
              coordinaten: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }
            })

            for (let element of this.state.sights) {
              if (this._isInPolygon(this.state.coordinaten, element.coordinates)) {
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
    let resp2 = await fetch('https://citygo-ap.azurewebsites.net/sights')
    let respJson2 = await resp2.json();
    this.setState({ sights: respJson2.sights })


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
       var id=this.state.id
       fetch("https://citygo-ap.azurewebsites.net/users/"+this.state.currentUser.userId+"/challenges/"+id, putMethod)
       //console.log(this.state.currentUser.userId)
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

  async apiCallChallenge(id) {
    let url = 'https://citygo-ap.azurewebsites.net/sights/' + id + '/challenges';
    let resp = await fetch(url)
    let respJson = await resp.json();
    this.setState({ vraag: respJson.challenges[0].task })
    this.setState({ juistantwoord: respJson.challenges[0].answer })
    this.setState({ id: respJson.challenges[0].challengeId })
  }


  // wanneer we op een letter duwen moet deze gevalideerd worden
  onKeyPress(letter) {
    let usedLetters = this.state.usedLetters;
    if (usedLetters.indexOf(letter) == -1) {
      this.validate(usedLetters, letter);
    } else {
      return;
    }
  }

  navigateBack(loswin) {

  }

  validate(usedLetters, letter) {
    // aangeklikte letters moeten worden bijgehouden
    usedLetters.push(letter);
    let correct = this.state.correct,
      wrong = this.state.wrong,
      answer = this.state.answer,
      lettersLeft = this.state.lettersLeft;
    if (answer.toUpperCase().indexOf(letter) == -1) {
      wrong++;
    } else {
      answer.toUpperCase().split("").map((value, index) => {
        if (value == letter) {
          lettersLeft[index] = letter;
          correct++;
        }
      });
    }
    //kijgen of de antwoorden overeekomen --> alles naar hoofdletters zetten voor de zekerheid
    if (lettersLeft.join("").replace(/\*/g, " ").toUpperCase() == answer.toUpperCase()) {
      Alert.alert(
        'Proficiat',
        'Je hebt het juiste antwoord geraden',
        [
          { text: 'OK', onPress: () => this.confirm },
        ],
        { cancelable: false }
      )
    }
    // je mag maximaal 5x verkeerd antwoorden, wanneer dit gebeurd krijg je een alert dat je verloren bent
    // alert moet nog aangepast worden
    if (wrong > 4) {
      Alert.alert(
        'Verloren...',
        'probeer later nog eens',
        [
          { text: 'OK', onPress: () => this.props.changeComponent('One') },
        ],
        { cancelable: false }
      )
    }
    this.setState({
      usedLetters: usedLetters,
      correct: correct,
      wrong: wrong,
      lettersLeft: lettersLeft,
    });
  }

  // tekenen van een keyboard
  renderKeyBoard() {
    const keysRows = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      [" ", "Z", "X", "C", "V", "B", "N", "M", " "]]
    return (
      <View style={styles.keyboard}>
        {keysRows.map((keys, rowIndex) => {
          return (
            <View key={rowIndex} style={styles.keyboardRow}>
              {keys.map((letter, index) => {
                if (letter == " ") {
                  return <Text key={index}> </Text>
                } else if (this.state.usedLetters.indexOf(letter) != -1) {
                  return <View style={styles.keyItem} key={index}><Text key={index} style={styles.usedKey}>{letter}</Text></View>
                } else {
                  return <TouchableHighlight
                    onPress={this.onKeyPress.bind(this, letter)} style={styles.keyItem} key={index}><Text style={styles.letter}>{letter}</Text></TouchableHighlight>
                }
              })}
            </View>
          )
        })}
      </View>
    )
  }
  renderDashes() {
    return (
      <View style={styles.dashes}>
        {this.state.lettersLeft.map((letter, index) => {
          if (letter == "*") {
            return (<View style={styles.dashItemContainer} key={index}><Text style={styles.dashBlankItem}>  </Text></View>)
          } else {
            return (<View style={styles.dashItemContainer} key={index}><Text style={styles.dashItem}>{letter}</Text></View>)
          }
        })}
      </View>
    )
  }






  render() {
    let rope = <Line x1="250" y1="0" x2="250" y2="120" stroke="#895917" strokeWidth="5" id="rope" />;
    let head = <Circle cx="250" cy="150" r="30" id="head" fill="#ecd2b7" />;
    let bodyMain = <Rect width="10" height="140" x="245" y="150" id="bodyMain" fill="#ecd2b7" />;
    let armright = <View style={styles.armRight}></View>;
    let armleft = <View style={styles.armLeft}></View>;
    let legright = <View style={styles.legRight}></View>;
    let legleft = <View style={styles.legLeft}></View>;

    return (
      <View style={styles.container}>
        <Svg version="1.1" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet" class="svg-content" width="200" height="250">
          <Rect fill="#053544" width="10" height="400" x="20" y="0" />
          <Rect fill="#053544" width="300" height="10" x="20" y="0" />
          <Rect fill="#053544" width="300" height="10" x="0" y="400" />
          {this.state.wrong > 0 ? rope : null}
          {this.state.wrong > 1 ? head : null}
          {this.state.wrong > 2 ? bodyMain : null}
          {this.state.wrong > 3 ? armright : null}
          {this.state.wrong > 3 ? armleft : null}
          {this.state.wrong > 4 ? legleft : null}
          {this.state.wrong > 4 ? legright : null}
        </Svg>
        {this.renderDashes()}
        <View style={styles.hintContainer}><Text style={styles.hintText}>Hint : {this.state.hint}</Text></View>
        {this.renderKeyBoard()}
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    alignSelf: 'flex-end',
    marginHorizontal: 16
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
  },
  profileImage: {
    width: 50,
    marginRight: 30,
    height: 50,
    borderRadius: 100,
    overflow: "hidden"
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32
  },
  button: {
    marginLeft: 100,
    backgroundColor: "darkorange",
    width: 100,
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 25
  },
  buttonlogout: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
    elevation: 8,
    backgroundColor: "#000000",
    borderRadius: 10,
    width: 350,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 12

  },
  buttonText: {
    alignSelf: 'center',
    color: "black",
    fontSize: 18
  },
  appButtonText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    color: "#000",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  statsBox: {
    alignItems: "center",
    flex: 1
  },
  mediaImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10
  },
  keyboard: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: "column"
  },
  keyboardRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    margin: 2
  },
  usedKey: {
    color: "grey",
    fontSize: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  letter: {
    color: "black",
    fontSize: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startGameBtn: {
    color: '#841584',
    fontSize: 25,
    margin: 10
  },
  dashInputStyle: {
    height: 40,
  },
  dashes: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    alignSelf: "auto",
    justifyContent: 'center',
    flexWrap: "wrap"
  },
  dashItemContainer: {
    flex: 0,
    padding: 5,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashItem: {
    width: 20,
    color: '#841584',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black"
  },
  dashBlankItem: {
    width: 20,
    fontSize: 20,
  },
  hintContainer: {
    flexWrap: 'wrap',
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: "lightgrey"
  },
  hintText: {
    fontSize: 18,
    fontWeight: "500",
  }, armRight: {
    position: 'absolute',
    transform: [{ rotate: '140deg' }],
    top: 80,
    right: 96,
    width: 25,
    height: 1,
    borderBottomColor: "#ecd2b7",
    borderBottomWidth: 5,
  }, armLeft: {
    position: 'absolute',
    transform: [{ rotate: '40deg' }],
    top: 80,
    right: 80,
    width: 25,
    height: 1,
    borderBottomColor: "#ecd2b7",
    borderBottomWidth: 5,
  }, legRight: {
    position: 'absolute',
    transform: [{ rotate: '40deg' }],
    top: 115,
    right: 80,
    width: 25,
    height: 1,
    borderBottomColor: "#ecd2b7",
    borderBottomWidth: 5,
  }, legLeft: {
    position: 'absolute',
    transform: [{ rotate: '140deg' }],
    top: 115,
    right: 96,
    width: 25,
    height: 1,
    borderBottomColor: "#ecd2b7",
    borderBottomWidth: 5,
  },

});
