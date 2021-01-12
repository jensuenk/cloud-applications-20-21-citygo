import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, TextInput, Text, View, FlatList, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import filter from 'lodash.filter';
import { sub } from 'react-native-reanimated';
const urlImage = 'https://rickandmortyapi.com/api/character/avatar/';

//https://rickandmortyapi.com/api/character/avatar/1.jpeg



export default class ProfilePicture extends React.Component {
  state = {
    loading: false,
    data: [],
  }

 

  componentDidMount() {
    this.getListRandM();
  }

  async getListRandM() {
    const { page, seed } = this.state
    let resp = await fetch('https://rickandmortyapi.com/api/character')

    let respJson = await resp.json();
   
    this.setState({ data: page === 1 ? respJson.results : [...this.state.data, ...respJson.results] })
    console.log(this.state.data)
  }

  renderItem = ({item, index})=>{

    return(
    <View style={styles.item}>
        <Image
        style={styles.image}
        resizeMode="contain"
        source={{uri:item.image}}/>
        <Text>{item.name}</Text>
      </View>)
  }

  backtoProfile = () => {
    this.props.changeComponent('One')
  };

render() {
    const{data} = this.state;
  return (
    <SafeAreaView style={styles.container}>
        <View>
         <TouchableOpacity  onPress={() => { this.backtoProfile() }}>
        <Text style = {styles.back}>BACK</Text>
        </TouchableOpacity>
        </View>
     <FlatList
     numColumns={2}
     style={styles.container}
     data = {data}
     renderItem={this.renderItem}
     />
    </SafeAreaView>
  )
}


}

const styles = StyleSheet.create({
 container:{
     flex:1,
 },
 item:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'white',
     marginTop:8,
     marginHorizontal:4,
     shadowColor: "#000",
     shadowOffset: {
        width: 0,
        height: 5,
     },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
 },
 image:{
     width:100,
     height:100,

 },
 back:{
    fontSize: 15,
    alignSelf: 'flex-start',
    color: "#000",
    fontWeight: "bold",
    textTransform: "uppercase",
 }
 
});
