import React, { useState, useEffect } from 'react';
import { StyleSheet,ActivityIndicator,TextInput, Text,View, FlatList, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import filter from 'lodash.filter';


export default class AddFriends extends React.Component {
    state = {
        loading: false,
        data: [],
        page: 1,
        seed: 1,
        error: null,
        query: '',
        fullData: []
    }


    componentDidMount() {
        this.makeRemoteRequest()
    }


    makeRemoteRequest = () => {
        const { page, seed } = this.state
        const url = 'https://randomuser.me/api/?seed=${seed}&results=100'
        this.setState({ loading: true })


        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.results : [...this.state.data, ...res.results],
                    error: res.error || null,
                    loading: false,
                    fullData: res.results
                })
            })
    }


    contains = ({ name, email }, query) => {
        const { first, last } = name
        if (
            first.includes(query) ||
            last.includes(query) ||
            email.includes(query)
        ) {
            return true
        }
        return false


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
              <Text  onPress={this.onPress} style={styles.appButtonText} >Back</Text>

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
        return (
            <View style={{
                flex: 1,
                paddingHorizontal: 20,
                paddingVertical: 20,
                marginTop: 40
              }}>
            <FlatList
                data = {this.state.data}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => alert('Friend request sended')}>
                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 16,
                          alignItems: 'center'
                        }}>
                        <Image
                          source={{ uri: item.picture.thumbnail }}
                          size='giant'
                          style={styles.profileImage}>
                          </Image>
                        
                        <Text
                          category='s1'
                          style={{
                            color: '#000'
                          }}>{`${item.name.first} ${item.name.last}`}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
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
      marginRight:30,
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
      flexDirection: "row",
      marginBottom: 10,
      elevation: 8,
      backgroundColor: "#FFF",
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
  
/*
const App = () => (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <HomeScreen />
    </ApplicationProvider>
  )
  
  
  export default App
  */
