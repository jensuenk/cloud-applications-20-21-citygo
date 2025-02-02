import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, TextInput, Text, View, FlatList, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import filter from 'lodash.filter';



export default class FriendRequest extends React.Component {
  state = {
    loading: false,
    data: [],
    page: 1,
    seed: 1,
    error: null,
    query: '',
    fullData: [],
    allUsers: [],
    uid: null,
    currentUser: null,

  }



  componentDidMount() {

    this.getUserById(global.uid);

    //this.apiCallUser()
  }




  async getUserById(id) {
    let resp = await fetch('https://citygo-ap.azurewebsites.net/Users/' + id);
    let respJson = await resp.json();
    this.setState({ currentUser: respJson });
    this.makeRemoteRequest()
    this.getAllUsers()

  }

  async apiCallUser() {
    const { page, seed } = this.state
    let resp = await fetch('https://citygo-ap.azurewebsites.net/Users/')
    let respJson = await resp.json();
    // console.log(respJson)
    this.setState({ allUsers: page === 1 ? respJson.users : [...this.state.allUsers, ...respJson.users] })
    console.log(this.state.allUsers)
    // TODO: order friends
  }

  getuserNames = () => {
    array.forEach(element => {

    });

    if (this.state.allUsers.userId) {

    }
  }



  makeRemoteRequest = () => {
    const { page, seed } = this.state
    //const url = 'https://randomuser.me/api/?seed=${seed}&results=100'
    const url = 'https://citygo-ap.azurewebsites.net/Users/' + this.state.currentUser.userId + '/FriendRequests'
    this.setState({ loading: true })


    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.friends : [...this.state.data, ...res.friends],
          error: res.error || null,
          loading: false,
          fullData: res.friends
        })

      })

  }



  contains = ({ userId, acceptedUser1, friendId, acceptedUser2 }, query) => {
    if (userId.includes(query) ||
      acceptedUser1.includes(query) ||
      friendId.includes(query) ||
      acceptedUser2.includes(query)
    ) {
      return true
    }
    return false


  }

  // versturen van een accepteren zal nu hardcoded zijn vanuit het standpunt van user1

  acceptFriendRequest = (fid, uid = this.state.currentUser.userId) => {

    const urlFriendRequest = 'https://citygo-ap.azurewebsites.net/Users/' + uid + '/FriendRequests/' + fid
    console.log(urlFriendRequest)
    const putMethod = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
      },
      body: {}
    }

    // make the HTTP put request using fetch api
    fetch(urlFriendRequest, putMethod)
      .then(response => response.json())
      .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
      .catch(err => console.log(err)) // Do something with the error



    //moet op beide plaatsen aangemaakt worden


  }


  getAllUsers = () => {
    const { page, seed } = this.state
    const url = 'https://citygo-ap.azurewebsites.net/Users'
    this.setState({ loading: true })


    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          allUsers: page === 1 ? res.users : [...this.state.allUsers, ...res.users],
          error: res.error || null,
          loading: false,



        })
      })

    //this.state.result = JSON.stringify(this.state.allUsers);
    //this.state.probeersel = JSON.stringify(this.state.allUsers.filter((x)=>x.userId === 4))
  }




  handleSearch = text => {
    // const formattedQuery = text.toLowercase()
    const data = filter(this.state.fullData, user => {
      return this.contains(user, text)
    })
    this.setState({ data, query: text })
  }


  renderHeader = () => (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Text onPress={this.onPress} style={styles.appButtonText} >Back</Text>

      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={this.handleSearch}
        status='info'
        placeholder='Search'
        style={{
          borderRadius: 25,
          borderColor: '#333',
          backgroundColor: '#fff'
        }}
        textStyle={{ color: '#000' }}
        clearButtonMode='always'
      ></TextInput>

    </View>

  )

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '5%'
        }}
      />
    )
  }

  renderFooter = () => {
    if (!this.state.loading) return null
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE'
        }}>
        <ActivityIndicator animating size='large' />
      </View>
    )
  }

  onPress = () => {
    this.props.changeComponent('One')
  };

  render() {
    const tempList = this.state.fullData.map(item => item.friendId);
    this.state.probeersel = this.state.allUsers.filter(item => (tempList.includes(item.userId)))
    const url = JSON.stringify(this.state.allUsers.filter(item => (tempList.includes(item.userId))))
    console.log(this.state.probeersel)
    return (
      <View style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: 40,
      }}>
        <FlatList
          data={this.state.probeersel}
          renderItem={
            ({ item }) => {
              if (item.friendId != this.state.currentUser.userId) {
                return (<View
                  style={{
                    flexDirection: 'row',
                    padding: 16,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <Image
                    source={{ uri: item.picrtureURL }}
                    size='giant'
                    style={styles.profileImage}>
                  </Image>

                  <Text
                    category='s1'
                    style={{
                      color: '#000',
                      width:100,
                    }}>{`${item.name}`}
                  </Text>
                  <TouchableOpacity onPress={() => this.acceptFriendRequest(item.userId)}>
                    <View style={styles.button}>
                      <Text style={styles.buttonText} >
                        Accept
                         </Text>
                    </View>
                  </TouchableOpacity>
                </View>)
              }

            }}

          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          ListHeaderComponent={this.renderHeader}
        ></FlatList>
      </View>
    )
  }


}

const styles = StyleSheet.create({
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
    position:'absolute',
    left:0,
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
  }
});
