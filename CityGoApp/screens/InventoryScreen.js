import * as React from 'react';
import { LogBox } from 'react-native';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { CheckBox } from 'react-native-elements'

export default class InventoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allSights: [],
      completedChallenges: []
    }
  }

  componentDidMount() {
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    this.apiCall();
    this.listUpdateTimer = setInterval(() => this.apiCall(), 10000);
  }

  async apiCall() {
    let sightsResp = await fetch('https://citygo-ap.azurewebsites.net/Sights')
    let sightsRespJson = await sightsResp.json();
    this.setState({ allSights: sightsRespJson.sights })
    let userResp = await fetch('https://citygo-ap.azurewebsites.net/Users/' + global.uid)
    let userRespJson = await userResp.json();
    this.setState({ completedChallenges: userRespJson.usersChallenges })
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