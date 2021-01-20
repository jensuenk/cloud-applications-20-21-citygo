import React from 'react'
import { View, Image, Text, StyleSheet, ToastAndroid } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const USER_ID = 4;

export default class CatchItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      item: null
    }
  }

  async componentDidMount() {
    this.state.item = this.props.collectItem;
    this.getUserById(USER_ID);
  }

  async getUserById(id) {
    let resp = await fetch('https://citygo-ap.azurewebsites.net/Users/' + id);
    let respJson = await resp.json();
    this.setState({ currentUser: respJson });
  }

  async addItemToUser() {
    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    };
    await fetch('https://citygo-ap.azurewebsites.net/Users/' + this.state.currentUser.userId + '/Items/' + this.state.item.itemId, request)
      .then(function (response) {
        return response.json();
      })
      .catch(function (error) {
        //console.log("Update location error", error)
      })
  }

  async collectItem() {
    let user = this.state.currentUser;
    user.balls = user.balls - 1;
    delete user.usersItems;
    delete user.usersChallenges;
    delete user.friends;
    delete user.userFriends;
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
      this.addItemToUser();
  }

  collect = () => {
    this.collectItem();
    this.props.changeComponent('One');
    ToastAndroid.show("Item added to your collection!", ToastAndroid.LONG);
  }

  render() {
    if (this.state.currentUser == null || this.state.item == null) {
      return (
        <View style={styles.container}></View>
      )
    }
    if (this.state.currentUser.balls > 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>New Item!</Text>
          <Text style={styles.name}>{this.state.item.name}</Text>
          <Text style={styles.rarity}>{this.state.item.rarity}</Text>
          <Image
            style={styles.logo}
            source={{
              uri: this.state.item.picture,
            }}
          />
          <TouchableOpacity style={styles.button1} onPress={this.collect}>
            <Text style={styles.button1_text}>Add to you collection</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => this.props.changeComponent('One')}>
            <Text style={styles.button2_text}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.balls_text}>{this.state.currentUser.balls} balls left</Text>
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>New Item!</Text>
          <Text style={styles.name}>{this.state.item.name}</Text>
          <Text style={styles.rarity}>{this.state.item.rarity}</Text>
          <Image
            style={styles.logo}
            source={{
              uri: this.state.item.picture,
            }}
          />
          <TouchableOpacity style={styles.no_balls_button1}>
            <Text style={styles.button1_text}>No balls left</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => this.props.changeComponent('One')}>
            <Text style={styles.button2_text}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.no_balls_text}>0 balls left</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 50,
    paddingRight: 50
  },
  header: {
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 20
  },
  name: {
    fontSize: 30,
    paddingBottom: 10,
  },
  rarity: {
    textAlign: 'center',
    fontSize: 25,
    paddingBottom: 10,
    marginBottom: 20,
    color: "purple",
    fontWeight: 'bold'
  },
  logo: {
    width: 300,
    height: 300,
  },
  no_balls_button1: {
    alignSelf: 'stretch',
    alignItems: 'center',
    width: 350,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "red",
    marginTop: 10,
    borderRadius: 100
  },
  button1: {
    alignSelf: 'stretch',
    alignItems: 'center',
    width: 350,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "purple",
    marginTop: 10,
    borderRadius: 100
  },
  button2: {
    alignSelf: 'stretch',
    alignItems: 'center',
    width: 350,
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 100
  },
  button1_text: {
    fontSize: 17,
    color: '#fff',
  },
  button2_text: {
    fontSize: 17,
  },
  balls_text: {
    marginTop: 10,
    fontSize: 17,
    color: "purple",
    fontWeight: 'bold'
  },
  no_balls_text: {
    marginTop: 10,
    fontSize: 17,
    color: "red",
    fontWeight: 'bold'
  }
})