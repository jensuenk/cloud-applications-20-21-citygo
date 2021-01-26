import * as React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { CheckBox } from 'react-native-elements'

export default class InventoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      sights: [],
      voltooideChallenges: [],
      booleans: [],
      voorlopigebool: false,
      i: 0,
      intOmTeChecken: 0,
      currentUser: null,
    }
  }

  async getUserById(id) {
    let resp = await fetch('https://citygo-ap.azurewebsites.net/Users/' + id);
    let respJson = await resp.json();
    this.setState({ currentUser: respJson });
  }



  componentDidMount() {
    this.getUserById(global.uid);
    this.ivoorcheckboxes = 0
    this.apiCall();
    this.listUpdateTimer = setInterval(() => this.apiCall(), 10000);
  }

  async apiCall() {
    let resp = await fetch('https://citygo-ap.azurewebsites.net/sights')
    let respJson = await resp.json();
    this.setState({ sights: respJson.sights })
    let resp2 = await fetch('https://citygo-ap.azurewebsites.net/users/'+this.state.currentUser.userId)
    let respJson2 = await resp2.json();
    this.setState({ voltooideChallenges: respJson2.usersChallenges })

    this.state.sights.forEach(sight => {
      this.checkenVanSightChallenge(sight)
      if (this.state.intOmTeChecken > 0) {
        const lijst = this.state.booleans;
        lijst.push(true);
        this.setState({ booleans: lijst })
      }
      else {
        const lijst = this.state.booleans;
        lijst.push(false);
        this.setState({ booleans: lijst })
      }

      this.setState({ intOmTeChecken: 0 });
    });

    //console.log(this.state.booleans) 

  }

  hasVisited(sight) {
    var returnValue = false;
    sight.challenges.forEach(sightChallenges => {
      this.state.completedChallenges.forEach(collectedChallenge => {
        if (sightChallenges.challengeId == collectedChallenge.challenge.challengeId) {
          returnValue = true;
        }
      });
    });
    return returnValue;
  }

  renderItem(item) {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}> {item.name}</Text>
        <Text style={styles.itemDesc}> {item.info}</Text>
        <View style={styles.checkbox}>
        <CheckBox
          checkedIcon={<Image source={require('../assets/checked.png')} />}
          uncheckedIcon={<Image source={require('../assets/unchecked.png')} />}
          checked={this.hasVisited(item)}
        />
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Visited Sights</Text>
        <FlatList
          renderItem
          data={this.state.allSights}
          renderItem={({ item, index }) => this.renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#ffffff',
    fontSize: 20,
    borderRadius: 10,
    marginBottom: 10,
    height: 100,
    padding: 10,
    paddingTop: 20
  },
  itemText: {
    fontWeight: 'bold',
    marginLeft: -5,
    fontSize: 26,
    width: "70%",
  },
  itemDesc: {
    fontSize: 18,
    width: "75%"
  },
  checkbox: {
    position: 'absolute',
    right: 0,
    marginTop: 10,
    width: "25%",
  }
});