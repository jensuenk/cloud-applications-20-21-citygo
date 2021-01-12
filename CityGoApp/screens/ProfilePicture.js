import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, TextInput, Text, View, FlatList, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import filter from 'lodash.filter';
import { sub } from 'react-native-reanimated';
const urlImage = 'https://pokeres.bastionbot.org/images/pokemon/';
const urlImage2 = 'https://rickandmortyapi.com/api/character/avatar/'

//https://rickandmortyapi.com/api/character/avatar/1.jpeg



export default class ProfilePicture extends React.Component {
  state = {
    loading: false,
    data: [],
  }

 

  componentDidMount() {
    this.getListPokemon();
  }

  async getListPokemon() {
    const { page, seed } = this.state
    let resp = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
    let respJson = await resp.json();
   // console.log(respJson)
    this.setState({ data: page === 1 ? respJson.results : [...this.state.data, ...respJson.results] })
    console.log(this.state.data)
    
  }

  renderItem = ({item, index})=>{
    let url = item.url;
    const idPokemon = url.split('https://pokeapi.co/api/v2/pokemon/');
    //console.log(idPokemon);
    const link = urlImage + idPokemon[1].substring(0,idPokemon[1].length-1) + ".png";
    const link2 = urlImage2 + idPokemon[1].substring(0,idPokemon[1].length-1) + ".jpeg";
    return(
    <View style={styles.item}>
        <Image
        style={styles.image}
        resizeMode="contain"
        source={{uri:link2}}/>
        <Text>{item.name}</Text>
      </View>)
  }

render() {
    const{data} = this.state;
  return (
    <SafeAreaView style={styles.container}>
     <FlatList
     numColumns={2}
     style={styles.container}
     data = {data}
     renderItem={this.renderItem}
     keyExtractor={item=>`key${item.name}`}
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
 
});
