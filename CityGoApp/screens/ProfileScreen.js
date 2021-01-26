import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList, SafeAreaView, Image, ScrollView, LogBox } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import StandardButton from '../components/StandardButton';
import Firebase from '../config/Firebase';
import LoginScreen from './LoginScreen';



export default class ProfileScreen extends React.Component {



  state = {
    location: null,
    city: null,
    country: null,
    errorMessage: null,
    name: [],
    balls: [],
    result: null,
    loading: false,
    data: [],
    page: 1,
    seed: 1,
    error: null,
    query: '',
    fullData: [],
    isLoading: true,
    FriendsList: [],
    FriendRequest: [],
    userchallanges: [],
    currentUser: null,

  };


  async getUserById(id) {
    let resp = await fetch('https://citygo-ap.azurewebsites.net/Users/' + id);
    let respJson = await resp.json();
    this.setState({ currentUser: respJson });
    this.apiCallFriends();
    this.apiCallUser();
    this.apiCallFriends();
    this.apiCalluserchallanges();
    this.apiCallFriendRequest();
  }


  componentDidMount() {
    this.getUserById(global.uid);

  }

  // nog een check doen voor als hij geen vrienden heeft
  async apiCallFriends() {
    const { page, seed } = this.state

    let resp = await fetch('https://citygo-ap.azurewebsites.net/Users/'+this.state.currentUser.userId+'/Friends')

    let respJson = await resp.json();
    this.setState({ FriendsList: page === 1 ? respJson.userFriends : [...this.state.FriendsList, ...respJson.userFriends] })

  }

  async apiCalluserchallanges() {
    const { page, seed } = this.state

    let resp = await fetch('https://citygo-ap.azurewebsites.net/Users/'+this.state.currentUser.userId)

    let respJson = await resp.json();
    // console.log(respJson)
    this.setState({ userchallanges: page === 1 ? respJson.usersChallenges : [...this.state.userchallanges, ...respJson.usersChallenges] })

    const membersToRender = this.state.userchallanges.filter(c => c.challengeId)
    const numRows = membersToRender.length
    console.log(numRows)
    // TODO: order friends
  }

  async apiCallUser() {
    const { page, seed } = this.state

    let resp = await fetch('https://citygo-ap.azurewebsites.net/Users/'+this.state.currentUser.userId)

    let respJson = await resp.json();
    // console.log(respJson)
    this.setState({ data: page === 1 ? respJson : [...this.state.data, ...respJson] })

  }


  async apiCallFriendRequest() {
    const { page, seed } = this.state

    let resp = await fetch('https://citygo-ap.azurewebsites.net/Users/'+this.state.currentUser.userId+'/FriendRequests')

    let respJson = await resp.json();
    this.setState({ FriendRequest: page === 1 ? respJson.friends : [...this.state.FriendRequest, ...respJson.friends] })

  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });

    if (location.coords) {
      const { latitude, longitude } = location.coords;

      const postalAddress = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      // stad = postalAddress[0].city
      // land = postalAddress[0].country


      this.setState({ city: postalAddress[0].city })
      this.setState({ country: postalAddress[0].country })

    }
  };



  alertItemName = (item) => {
    alert(item.name)
  }

  goToAddFriends = () => {
    this.props.changeComponent('Two')
  };

  /*
  signOut = () => {
    Firebase.auth()
      .signOut()
      .then(() => this.props.navigation.navigate('LoginScreen'))
      .catch(error => console.log(error))
  }
*/

  goToHangman = () => {
    this.props.changeComponent('Four')
  }



  goToFriends = () => {
    this.props.changeComponent('Three')
  }

  gotoRequests = () => {
    this.props.changeComponent('Five')
  }

  goToProfilePictures = () => {
    this.props.changeComponent('Seven')
  }


  //logout functie

  logout = () => {
    //logout via firebase afhandelen
    Firebase.auth()
      .signOut()
      .then(() => this.props.navigation.navigate('LoginScreen'))
      .then(() => this.props.changeComponent('Six'))
      .catch(error => console.log(error))
    global.Myuser = false;
  };



  render() {
    const { FriendRequest, data, isLoading } = this.state;
    let text = 'Waiting..';
    let stad = this.state.city;
    let land = this.state.country;
    let naam = this.state.data.name
    let balls = this.state.data.balls
    let score = this.state.data.score
    let picurl = this.state.data.picrtureURL
    // let numbofchallanges = this.state.userchallanges.length
    let teller = 0
    /*
     
        let amountRequest =
        
        let noRequest = <View style={styles.statsBox}>
          <Text style={[styles.text, { fontSize: 24 }]}>{this.state.FriendRequest.length}</Text>
          <Text style={[styles.text, styles.subText]}>Friend Request</Text>
        </View>;
        */

    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      stad = stad;
      land = land;
      naam = naam;
      balls = balls;
      score = score;
      picurl = picurl;
    }

    return (
      <SafeAreaView style={styles.container} data={this.state.data}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleBar}>
            <TouchableOpacity onPress={() => { this.logout() }}>
              <Ionicons name="md-log-out" size={24} color="#52575D"></Ionicons>
            </TouchableOpacity>
          </View>

          <View style={{ alignSelf: "center" }}>
            <View>
              {this.state.FriendRequest.length>0 && <TouchableOpacity onPress={() => this.gotoRequests()}><Image  style={styles.imagerequest} source={require('../Images/friendRequesticon.jpg')} /></TouchableOpacity>}
             
            </View>
            <View style={styles.profileImage}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={{ uri: picurl }} />
            </View>

            <View style={styles.add}>
              <TouchableOpacity onPress={() => { this.goToProfilePictures() }}>
                <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{naam}</Text>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 20 }]}>{land}, {stad}</Text>

          </View>

          <View style={styles.statsContainer}>
            <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
              <Text style={[styles.text, { fontSize: 22 }]}>{score}</Text>
              <Text style={[styles.text, styles.subText]}>score</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 22 }]}>666</Text>
              <Text style={[styles.text, styles.subText]}>challanges</Text>
            </View>
            <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
              <Text style={[styles.text, { fontSize: 22 }]}>{balls}</Text>
              <Text style={[styles.text, styles.subText]}>balls</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 22 }]}>{this.state.FriendsList.length}</Text>
              <Text onPress={() => this.goToFriends()} style={[styles.text, styles.subText]}>friends</Text>
            </View>



          </View>
          <View style={{ marginTop: 32 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.mediaImageContainer}>
                <Image source={require("../assets/Balleke.jpg")} style={styles.image} resizeMode="cover"></Image>
              </View>
              <View style={styles.mediaImageContainer}>
                <Image source={require("../assets/Balleke.jpg")} style={styles.image} resizeMode="cover"></Image>
              </View>
              <View style={styles.mediaImageContainer}>
                <Image source={require("../assets/Balleke.jpg")} style={styles.image} resizeMode="cover"></Image>
              </View>
              <View style={styles.mediaImageContainer}>
                <Image source={require("../assets/Balleke.jpg")} style={styles.image} resizeMode="cover"></Image>
              </View>
              <View style={styles.mediaImageContainer}>
                <Image source={require("../assets/Balleke.jpg")} style={styles.image} resizeMode="cover"></Image>
              </View>
              <View style={styles.mediaImageContainer}>
                <Image source={require("../assets/Balleke.jpg")} style={styles.image} resizeMode="cover"></Image>
              </View>
            </ScrollView>
          </View>
          <View style={styles.centerText}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Top Friends</Text>
          </View>
          <View style={{ flex: 1, padding: 24 }}>
            <FlatList
              data={this.state.FriendsList}
              FriendRequest={this.state.FriendRequest}
              renderItem={
                ({ item }) => {
                  if (item.userId != this.state.currentUser.userId) {
                    return (<View
                      style={{
                        flexDirection: 'row',
                        padding: 16,
                        alignItems: 'center',
                        alignSelf: "center",
                        fontWeight: "200",
                      }}>
                      <Text>{teller = teller + 1}. </Text>
                      <Text
                        category='s1'
                        style={{
                          color: '#000'
                        }}>{`${item.name}`}
                      </Text>
                      <Text
                        category='s1'
                        style={{
                          color: '#000'
                        }}>{`       score: ${item.score}`}
                      </Text>
                    </View>)
                  }

                }}

              keyExtractor={item => item.email}
              ItemSeparatorComponent={this.renderSeparator}
              ListFooterComponent={this.renderFooter}
              ListHeaderComponent={this.renderHeader}
            ></FlatList>

          </View>

          <View>
            <TouchableOpacity
              onPress={() => this.goToAddFriends()}
              style={styles.buttonlogout}>
              <Text style={styles.appButtonText} >ADD FRIENDS</Text>
            </TouchableOpacity>
          </View>

          <StandardButton
            buttonTitle="Hangman"
            onPress={() => { this.goToHangman() }}
          />


        </ScrollView>
      </SafeAreaView>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  text: {
    //fontFamily: "IowanOldStyle",
    color: "#52575D"
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  imagerequest: {
    width: 60,
    height: 60,
    overflow: "hidden",
    marginLeft:150
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    alignSelf: 'flex-end',
    marginHorizontal: 16
  },
  subText: {
    fontSize: 10,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
    alignSelf: 'center'
  },
  profileImage: {
    width: 200,
    height: 200,
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
  centerText: {
    alignSelf: "center",
    fontWeight: "200",
    fontSize: 36
  },
  button: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    width: 350,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 12
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
  appButtonText: {
    fontSize: 18,
    color: "#fff",
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
  }
});
