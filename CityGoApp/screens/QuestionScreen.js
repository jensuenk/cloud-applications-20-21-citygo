import React from 'react'
import { View, Text, TextInput, StyleSheet, ToastAndroid } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class QuestionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sight: null,
      challenge: null,
      answer: ""
    }
  }

  async componentDidMount() {
    this.setState({ sight: this.props.sight });
    this.setState({ challenge: this.props.sight.challenges[0] });
  }

  confirm = () => {
    if (this.state.answer.toUpperCase() == this.state.challenge.answer.toUpperCase()) {
      this.props.setRewardChallenge(this.state.challenge);
      this.props.changeComponent('reward');
      ToastAndroid.show("Congratulations!", ToastAndroid.LONG);
    }
    else {
      ToastAndroid.show("Wrong answer!", ToastAndroid.LONG);
    }
  }

  onAnswer = (text) => {
    this.setState({ answer: text })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.sight != null && <Text style={styles.header}>You are close to {this.state.sight.name}.</Text>}
        {this.state.sight != null && <Text style={styles.question}>{this.state.challenge.questionChallenge}</Text>}
        <TextInput
          style={styles.textinput}
          placeholder="Answer"
          onChangeText={this.onAnswer}
        />
        <TouchableOpacity style={styles.button1} onPress={this.confirm}>
          <Text style={styles.btntext}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => this.props.changeComponent('One')}>
          <Text style={styles.btntext}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#36485f',
    paddingLeft: 50,
    paddingRight: 50
  },
  header: {
    fontSize: 30,
    color: '#fff',
    paddingBottom: 0,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#199187'
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#fff',
    borderColor: '#f8f8f8',
    borderBottomWidth: 1
  },
  question: {
    fontSize: 20,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 20,
  },
  button1: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginBottom: 30
  },
  button2: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#36485f',
    marginBottom: 30,
    borderColor: '#808080',
    borderWidth: 3
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold'
  }
});