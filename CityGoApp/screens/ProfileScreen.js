import React, { useState, useEffect } from 'react';
import {ActivityIndicator, StyleSheet, Text, View, FlatList, SafeAreaView, Image, ScrollView, LogBox } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';



export default class ProfileScreen extends React.Component {

  
  
  state = {
    location: null,
    city:null,
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
    isLoading: true
    
  };


  
/*
    apiCall = async () =>  {
      const url = 'https://citygo5.azurewebsites.net/Users/1'
      const { page, seed } = this.state
      let resp = await  fetch(url).then(res => res.json())
       .then(res => {
      this.setState({
        data: page === 1 ? res.userFriends : [...this.state.data, ...res.userFriends],
        error: res.error || null,
        loading: false,
        fullData: res.userFriends
        
      })
      
    })
  }
  */

  componentDidMount() {
   this.apiCall();
  }
  async apiCall() {
    let resp = await fetch('https://citygo5.azurewebsites.net/Users/1')
    let respJson = await resp.json();
    console.log(respJson)
    this.setState({ data: page === 1 ? res.userFriends : [...this.state.data, ...res.userFriends] })
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
      console.log(postalAddress[0].city)
      console.log(postalAddress[0].country)

      this.setState({city: postalAddress[0].city})
      this.setState({country: postalAddress[0].country})

    }
  };

  
  
  alertItemName = (item) => {
    alert(item.name)
  }

  onPress = () => {
      this.props.changeComponent('Two')
  };

  goToFriends = () => {
    this.props.changeComponent('Three')
  }

  //logout functie
  /*
  logout = () => {
    //logout via firebase afhandelen
    this.props.changeComponent('login')
  };
  */

  
  render() {
    const { data, isLoading } = this.state;
    let text = 'Waiting..';
    let stad = this.state.city;
    let land = this.state.country;
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      stad = stad;
      land = land;
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleBar}>
            <TouchableOpacity>
              <Ionicons name="md-log-out" size={24} color="#52575D"></Ionicons>
            </TouchableOpacity>
          </View>

          <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
              <Image source={require('../assets/Balleke.jpg')} style={styles.image} resizeMode="center"></Image>
            </View>

            <View style={styles.add}>
              <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Philip</Text>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 20 }]}>{land}, {stad}</Text>
            
          </View>

          <View style={styles.statsContainer}>
          <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
              <Text style={[styles.text, { fontSize: 24 }]}>10</Text>
              <Text style={[styles.text, styles.subText]}>score</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>10</Text>
              <Text style={[styles.text, styles.subText]}>challanges</Text>
            </View>
            <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
              <Text style={[styles.text, { fontSize: 24 }]}>10</Text>
              <Text style={[styles.text, styles.subText]}>balls</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>10</Text>
              <Text  onPress={() => this.goToFriends()} style={[styles.text, styles.subText]}>friends</Text>
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
        data={this.state.data}
        renderItem={ 
          ({ item }) =>  {
            if(item.userId != 1){
              return(  <View
                style={{
                  flexDirection: 'row',
                  padding: 16,
                  alignItems: 'center'
                }}>   
                <Text
                  category='s1'
                  style={{
                    color: '#000'
                  }}>{`${item.name}`} 
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
             onPress={this.onPress}
             style={styles.buttonlogout}>
              <Text style={styles.appButtonText} >ADD FRIENDS</Text>
            </TouchableOpacity>
          </View>



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
  centerText:{
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
