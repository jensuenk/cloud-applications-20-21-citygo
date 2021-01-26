import * as React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { CheckBox } from 'react-native-elements'

export default class ItemCollectionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allItems: [],
      collectedItems: []
    }
  }

  componentDidMount() {
    this.apiCall();
    this.listUpdateTimer = setInterval(() => this.apiCall(), 10000);
  }

  async apiCall() {
    let itemsResp = await fetch('https://citygo-ap.azurewebsites.net/Items')
    let itemsRespJson = await itemsResp.json();
    this.setState({ allItems: itemsRespJson.items })
    let userResp = await fetch('https://citygo-ap.azurewebsites.net/Users/' + global.uid)
    let userRespJson = await userResp.json();
    this.setState({ collectedItems: userRespJson.usersItems })
  }

  hasItem(item) {
    var returnValue = false;
    this.state.collectedItems.forEach(collectedItem => {
      if (item.itemId == collectedItem.item.itemId) {
        returnValue = true;
      }
    });
    return returnValue;
  }

  renderItem(item) {
    return (
      <View style={styles.item}>
        <Image style={styles.logo} source={{uri: item.picture}}/>
        <Text style={styles.itemText}> {item.name}</Text>
        <Text style={styles.itemDesc}> {item.rarity}</Text>
        <View style={styles.checkbox}>
          <CheckBox
            checkedIcon={<Image source={require('../assets/checked.png')}/>}
            uncheckedIcon={<Image source={require('../assets/unchecked.png')}/>}
            checked={this.hasItem(item)}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Item Collection</Text>
        <FlatList
          renderItem
          data={this.state.allItems}
          renderItem={({ item, index }) => this.renderItem(item)}
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
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#ffffff',
    fontSize: 20,
    borderRadius: 10,
    marginBottom: 10,
    height: 100,
    padding: 10,
    paddingLeft: 100
  },
  logo: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 80,
    height: 80,
    borderRadius: 10
  },
  itemText: {
    marginTop: 14,
    fontWeight: 'bold',
    fontSize: 22,
    width: "75%"
  },
  itemDesc: {
    fontSize: 18,
    width: "75%"
  },
  checkbox: {
    position: 'absolute',
    right: 0,
    marginTop: 10,
  }
});