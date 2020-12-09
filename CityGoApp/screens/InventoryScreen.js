import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image
} from 'react-native';
import { CheckBox } from 'react-native-elements'


export default class InventoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      sights: [],
      voltooideChallenges:[]
    }
  }

  componentDidMount() {
    this.apiCall();

  }

  async apiCall() {
    let resp = await fetch('https://citygo5.azurewebsites.net/sights')
    let respJson = await resp.json();
    this.setState({ sights: respJson.sights })
  }

  // er moet nog weergegeven of het voltooid is of niet met bv vinkje
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>COMPLETED SIGHTS</Text>
        <FlatList
          data={this.state.sights}
          renderItem={({ item }) =>
            <View><Text style={styles.item}>  {item.name}</Text>        <CheckBox
              checkedIcon={<Image source={require('../assets/checked.png')} />}
              uncheckedIcon={<Image source={require('../assets/unchecked.png')} />}
              checked="true"
              onPress={() => this.setState({ checked: !this.state.checked })}
            /></View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#36485f',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 50
  },
  header: {
    fontSize: 35,
    color: '#fff',
    paddingBottom: 0,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#199187'
  },
  item: {
    fontSize: 30,
    borderColor: 'white',
    borderWidth: 2,
    color: 'white'
  }
})