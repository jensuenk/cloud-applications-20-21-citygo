import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image
} from 'react-native';
import { CheckBox } from 'react-native-elements'
import { TabRouter } from 'react-navigation';


export default class InventoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      sights: [],
      voltooideChallenges: [],
      booleans: [],
      voorlopigebool: false,
      i: 0,
      intOmTeChecken: 0,
    }
  }



  componentDidMount() {
    this.ivoorcheckboxes = 0
    this.apiCall();

  }

  //voorlopig enkel user 1 aangezien login nog niet helemaal werkt
  async apiCall() {
    let resp = await fetch('https://citygo5.azurewebsites.net/sights')
    let respJson = await resp.json();
    this.setState({ sights: respJson.sights })
    let resp2 = await fetch('https://citygo5.azurewebsites.net/users/1')
    let respJson2 = await resp2.json();
    this.setState({ voltooideChallenges: respJson2.challenges })

    this.state.sights.forEach(sight => {


      this.checkenVanSightChallenge(sight)
      if (this.state.intOmTeChecken > 0) {
        const lijst = this.state.booleans;
        lijst.push(true);
        this.setState({ booleans: lijst })
      }
      else {
        const lijst = this.state.booleans;
        lijst.push(false);
        this.setState({ booleans: lijst })
      }

      this.setState({ intOmTeChecken: 0 });
    });



  }

  checkenVanSightChallenge(sight) {
    this.state.voltooideChallenges.forEach(voltooidech => {

      if (sight.challenges[0].challengeId == voltooidech.challengeId) {
        let i = this.state.intOmTeChecken;
        i++;
        this.setState({ intOmTeChecken: i })
      }

    });
  }

  renderItem(item, index) {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>  {item.name}</Text>
        <View style={styles.checkbox}>
        <CheckBox
          checkedIcon={<Image source={require('../assets/checked.png')} />}
          uncheckedIcon={<Image source={require('../assets/unchecked.png')} />}
          checked={this.state.booleans[index]}
        />
        </View>
      </View>
    )
  }


  // er moet nog weergegeven of het voltooid is of niet met bv vinkje
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>COMPLETED SIGHTS</Text>
        <FlatList
          renderItem
          data={this.state.sights}
          renderItem={({ item, index }) => this.renderItem(item, index)}
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
    color: 'white',
    height:100
  },
  itemText: {
    fontSize: 40,
    color: 'white',
    width: "70%"
  },
  checkbox: {
    position: 'absolute',
    right: 0,
    width: "30%",
  }
})