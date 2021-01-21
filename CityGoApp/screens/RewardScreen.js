import React from 'react'
import { View, Image, Text, StyleSheet, ToastAndroid } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class RewardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      challenge: null,
      item: null
    }
  }

  async componentDidMount() {
    this.getUserById(global.uid);
    this.state.challenge = this.props.rewardChallenge;
    
  }

  async getUserById(id) {
    let resp = await fetch('https://citygo-ap.azurewebsites.net/Users/' + id);
    let respJson = await resp.json();
    this.setState({ currentUser: respJson });

    let resp1 = await fetch('https://citygo-ap.azurewebsites.net/Challenges/' + this.state.challenge.challengeId + '/Items');
    let respJson1 = await resp1.json();
    this.setState({ challenge: respJson1 });

    this.state.challenge.items.forEach(item => {
      this.setState({ item: item });
    });
  }

  async updateUsersCollection() {
    let user = this.state.currentUser;
    delete user.usersItems;
    delete user.usersChallenges;
    delete user.friends;
    delete user.userFriends;
    if (this.state.challenge.balls != null) {
      user.balls = user.balls + this.state.challenge.balls;
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
      .catch(function (error) {
        //console.log("Save error", error)
      })
    // Add challenge to user
    await fetch('https://citygo-ap.azurewebsites.net/Users/' + this.state.currentUser.userId + '/Challenges/' + this.state.challenge.challengeId, request)
      .then(function (response) {
        return response.json();
      })
      .catch(function (error) {
        //console.log("Save error", error)
      })
      
    if (this.state.item != null) {
      this.props.setCollectItem(this.state.item);
      this.props.changeComponent('catch');
    }
  }

  collect = () => {
    this.updateUsersCollection();
    this.props.changeComponent('One');
    ToastAndroid.show("Added rewards to your collection!", ToastAndroid.LONG);
  }

  collectCatch = () => {
    console.log("User: ", this.state.currentUser)
    this.updateUsersCollection();
  }

  render() {
    if (this.state.currentUser == null || this.state.challenge == null || this.state.item == null) {
      return (
        <View style={styles.container}></View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Challenge Rewards</Text>
        <Text style={styles.subheader}>See below the reward summary of the completed challenge:</Text>
        <Text style={styles.reward}>+ {this.state.challenge.score} EXP</Text>
        {this.state.challenge.balls != null && <Text style={styles.reward}>+ {this.state.challenge.balls}x Balls</Text>}
        {this.state.item != null && <Text style={styles.reward}>+ 1x {this.state.item.name}</Text>}
        
        {this.state.item == null && <TouchableOpacity style={styles.button1} onPress={this.collect}>
          <Text style={styles.button1_text}>Collect</Text>
        </TouchableOpacity>}
        {this.state.item != null && <TouchableOpacity style={styles.button1} onPress={this.collectCatch}>
          <Text style={styles.button1_text}>Collect & Catch</Text>
        </TouchableOpacity>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40,
  },
  subheader: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 50,
    marginLeft: 5,
    marginRight: 5,
  },
  reward: {
    fontSize: 27,
    paddingBottom: 10,
    color: "green"
  },
  logo: {
    width: 70,
    height: 70,
  },
  button1: {
    alignSelf: 'stretch',
    alignItems: 'center',
    width: 350,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "green",
    marginTop: 50,
    borderRadius: 100
  },
  button1_text: {
    fontSize: 20,
    color: '#fff',
  }
})