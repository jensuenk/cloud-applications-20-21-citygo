import React, { useState, useEffect } from 'react';
import {  StyleSheet, Text, TextInput, View, Button, TouchableHighlight, Alert} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import filter from 'lodash.filter';
import Svg, { Circle, Rect } from 'react-native-svg';



export default class Hangman extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          "answer":"test",
          "hint":"test",
          "correct":0,
          "wrong":0,
          "usedLetters":[],
          "lettersLeft":[],
          "input":"",
          "score":0
        }
 
      } 

 

  componentDidMount() {
    
  }

 

  onKeyPress(letter){
    let usedLetters = this.state.usedLetters;
    if(usedLetters.indexOf(letter)==-1){
      this.validate(usedLetters,letter);
    }else{
      return;
    }
  }
 
  validate(usedLetters,letter){
    usedLetters.push(letter);
    let correct = this.state.correct,
      wrong = this.state.wrong,
      answer = this.state.answer,
      lettersLeft = this.state.lettersLeft,
      score = this.state.score;
    if(answer.toUpperCase().indexOf(letter)==-1){
      wrong++;
      if(score>0){
        score --;
      }
    } else{
      answer.toUpperCase().split("").map((value,index)=>{
        if(value==letter){
          lettersLeft[index] = letter;
          correct ++;
          score++;
        }
      });
    }
    if(lettersLeft.join("").replace(/\*/g," ").toUpperCase() == answer.toUpperCase()){
      Alert.alert(
        'You win',
        'You have gussed the correct answer',
        [
          {text: 'OK', onPress: () => this.init()},
        ],
        { cancelable: false }
      )
    }
    if(wrong>4){
      Alert.alert(
        'You Lost',
        'Answer: '+answer.toUpperCase() +" "+this.state.hint,
        [
          {text: 'OK', onPress: () => this.init()},
        ],
        { cancelable: false }
      )
    }
    this.setState({
      usedLetters:usedLetters,
      correct:correct,
      wrong:wrong,
      lettersLeft:lettersLeft,
      score:score
    });
  }


  renderKeyBoard(){
    const keysRows = [
      ["Q","W","E","R","T","Y","U","I","O","P"],
      ["A","S","D","F","G","H","J","K","L"],
      [" ","Z","X","C","V","B","N","M"," "]]
    return(
      <View style={styles.keyboard}>
        {keysRows.map((keys,rowIndex)=>{
          return(
            <View key={rowIndex} style={styles.keyboardRow}>
              {keys.map((letter,index)=>{
                if(letter==" "){
                  return <Text key={index}> </Text>
                }else if(this.state.usedLetters.indexOf(letter)!=-1){
                  return <View style={styles.keyItem} key={index}><Text key={index} style={styles.usedKey}>{letter}</Text></View>
                }else{
                  return <TouchableHighlight
                   onPress={this.onKeyPress.bind(this,letter)} style={styles.keyItem} key={index}><Text style={styles.letter}>{letter}</Text></TouchableHighlight>
                }
              })}
            </View>
          )
        })}
      </View>
    )
  }
  renderDashes(){
    return(
      <View style={styles.dashes}>
        {this.state.lettersLeft.map((letter,index)=>{
          if(letter=="*"){
            return (<View style={styles.dashItemContainer} key={index}><Text style={styles.dashBlankItem}>  </Text></View>)
          }else{
            return(<View style={styles.dashItemContainer} key={index}><Text style={styles.dashItem}>{letter}</Text></View>)
          }
        })}
      </View>
    )
  }






render() {
  return (
    <View style={styles.container}>
    <Text style={styles.scoreText}>Score: {this.state.score}</Text>
    <Svg version="1.1" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet" class="svg-content" width="200" height="250">
    <Rect fill="#053544" width="10" height="400" x="20" y="0" />
    <Rect fill="#053544" width="300" height="10" x="20" y="0" />
    <Rect fill="#053544" width="300" height="10" x="0" y="400" />
    </Svg>
    {this.renderDashes()}
    <View style={styles.hintContainer}><Text style={styles.hintText}>Hint : {this.state.hint}</Text></View>
    {this.renderKeyBoard()}
  </View>
  )
}


}

const styles = StyleSheet.create({
   container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    width: 50,
    marginRight: 30,
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
  },
  keyboard: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection:"column"
  },
  keyboardRow: {
    flex: 1,
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyItem:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:15,
    margin:2
  },
  usedKey:{
    color:"grey",
    fontSize:20,
    width:20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  letter:{
    color:"black",
    fontSize:20,
    width:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startGameBtn: {
    color: '#841584',
    fontSize:25,
    margin:10
  },
  dashInputStyle:{
    height: 40, 
  },
  dashes:{
    flex: 1,
    flexDirection:"row",
    alignItems: 'center',
    alignSelf:"auto",
    justifyContent: 'center',
    flexWrap:"wrap"
  },
  dashItemContainer:{
    flex:0,
    padding:5,
    margin:2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashItem:{
    width:20,
    color: '#841584',
    fontSize:20,
    borderBottomWidth:1,
    borderBottomColor:"black"
  },
  dashBlankItem:{
    width:20,
    fontSize:20,
  },
  hintContainer:{
    flexWrap: 'wrap',
    alignItems: "flex-start",
    padding:10,
    backgroundColor:"lightgrey"
  },
  hintText:{
    fontSize:18,
    fontWeight:"500",
  },
  scoreText:{
    fontSize:13,
    textAlign:"right",
    fontWeight:"500",
    justifyContent:"flex-end",
    width:"100%"
  }

});
