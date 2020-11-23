import React, { Component } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Dit is code om een memory game te maken aan het mas
// Ik krijg mijn opmaak wel, maar ik krijg de werking erachter niet in orde
// Ik laat dit voorlopig even links liggen en kom hier later op terug
// Stef


export default class MemoryGame extends React.Component {

    constructor(props) {
        super(props);
        this.state =
        {
            url1: require('../Images/Vraagteken.jpg'),
            url2:require('../Images/Gert.png')
        }
    }

    changeLogo() {
        console.log('state changed!');
        this.setState({
            url1: require('../Images/Mas.jpg')
        });
    } 





    render() {
        return (
            <View style={styles.container}>
                <View style={styles.gameBoard}>
                    <TouchableOpacity style={styles.button} onPress={() => this.changeLogo()}>
                        <Image source={this.state.url1}
                            style={{ width: '100%', height: '100%', aspectRatio: 1, }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.changeLogo()}>
                        <Image source={this.state.url1}
                            style={{ width: '100%', height: '100%', aspectRatio: 1, }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Image source={{ uri: 'https://www.showbizzsite.be/sites/default/files/styles/news_thumbnail_725_345//public/0417-030_VIER_mosaic_GERT_VERHULST.png' }}
                            style={{ width: '100%', height: '100%', aspectRatio: 1, }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Image source={{ uri: 'https://www.showbizzsite.be/sites/default/files/styles/news_thumbnail_725_345//public/0417-030_VIER_mosaic_GERT_VERHULST.png' }}
                            style={{ width: '100%', height: '100%', aspectRatio: 1, }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Image source={{ uri: 'https://www.mas.be/sites/mas/files/banner_images/handje_c_MAS_0.jpg' }}
                            style={{ width: '100%', height: '100%', aspectRatio: 1, }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Image source={{ uri: 'https://www.mas.be/sites/mas/files/banner_images/handje_c_MAS_0.jpg' }}
                            style={{ width: '100%', height: '100%', aspectRatio: 1, }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Image source={{ uri: 'https://dekamers.be/wp-content/uploads/2015/03/Stad-antwerpen-logo.jpg' }}
                            style={{ width: '100%', height: '100%', aspectRatio: 1, }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Image source={{ uri: 'https://dekamers.be/wp-content/uploads/2015/03/Stad-antwerpen-logo.jpg' }}
                            style={{ width: '100%', height: '100%', aspectRatio: 1, }}
                        />
                    </TouchableOpacity>
                </View>
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
        backgroundColor: '#36485f'
    },
    gameBoard: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    button: {
        backgroundColor: '#ccc',
        borderRadius: 8,
        width: 130,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
        margin: (Dimensions.get('window').width - (48 * 4)) / (10 * 2)
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
})