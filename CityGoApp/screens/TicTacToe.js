import React, { Component } from 'react';
import { Alert, Animated, Button, Dimensions, StyleSheet, TouchableOpacity, View, Text, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

export default class TicTacToe extends React.Component {

    constructor(props) {
        super(props);

        this.moveAnimation = new Animated.ValueXY({ x: 20, y: 0 });

        this.state = {
            gameState: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            currentPlayer: 1,
        }
    }


    movePlayerText = player => {


        Animated.spring(this.moveAnimation, {
            toValue: (player === 1 ? { x: 20, y: 0 } : { x: Dimensions.get('window').width - 100, y: 0 })
        }).start();


    };

    initializeGame = () => {
        this.setState({
            gameState: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            currentPlayer: 1
        });
        this.movePlayerText(1);
    };

    componentDidMount() {
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
        this.initializeGame();
    }

    renderIcon(row, col) {
        let value = this.state.gameState[row][col];
        switch (value) {
            case 1:
                return <Icon name='md-close' style={styles.tileX} />;
            case -1:
                return <Icon name='md-radio-button-off' style={styles.tileO} />;
            case 0:
                return <View />
        }
    }

    getWinner = () => {

        const NUM_TILES = 3;
        let arr = this.state.gameState;
        let sum = 0;


        //Satır Kontrolü
        for (let i = 0; i < NUM_TILES; i++) {
            sum = arr[i][0] + arr[i][1] + arr[i][2];
            if (sum === 3) return 1;
            else if (sum === -3) return -1;
        }

        //Sütun Kontrolü
        for (let i = 0; i < NUM_TILES; i++) {
            sum = sum = arr[0][i] + arr[1][i] + arr[2][i];
            if (sum === 3) return 1;
            else if (sum === -3) return -1;
        }

        //Çapraz Kontrol
        sum = arr[0][0] + arr[1][1] + arr[2][2];
        if (sum === 3) return 1;
        else if (sum === -3) return -1;

        sum = arr[0][2] + arr[1][1] + arr[2][0];
        if (sum === 3) return 1;
        else if (sum === -3) return -1;


        return 0;
    };

    async onTilePress(row, col) {

        let value = this.state.gameState[row][col];
        if (value !== 0) return;


        let player = this.state.currentPlayer;
        let arr = this.state.gameState.slice();
        arr[row][col] = player;
        this.setState({ gameState: arr });
        let nextPlayer = (player === 1 ? -1 : 1);
        this.setState({ currentPlayer: nextPlayer });
        this.movePlayerText(nextPlayer);

        let winner = this.getWinner();
        if (winner === 1) {
            //Alert.alert("Player 1 won!");
            this.props.setRewardChallenge(this.state.challenge);
              this.props.changeComponent('reward');
              ToastAndroid.show("Congratulations!", ToastAndroid.LONG);
        } else if (winner === -1) {
           // Alert.alert("Player 2 won!");
            this.props.setRewardChallenge(this.state.challenge);
              this.props.changeComponent('reward');
              ToastAndroid.show("Congratulations!", ToastAndroid.LONG);
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <Animated.Text
                    style={[styles.player, this.moveAnimation.getLayout()]}>
                    Player{this.state.currentPlayer === 1 ? 1 : 2}</Animated.Text>

                <View style={styles.flexRow}>
                    <TouchableOpacity style={[styles.tiles, { borderLeftWidth: 0, borderTopWidth: 0 }]}
                        onPress={() => this.onTilePress(0, 0)}>
                        {this.renderIcon(0, 0)}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tiles, { borderTopWidth: 0 }]}
                        onPress={() => this.onTilePress(0, 1)}>
                        {this.renderIcon(0, 1)}

                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tiles, { borderRightWidth: 0, borderTopWidth: 0 }]}
                        onPress={() => this.onTilePress(0, 2)}>
                        {this.renderIcon(0, 2)}

                    </TouchableOpacity>
                </View>
                <View style={styles.flexRow}>
                    <TouchableOpacity style={[styles.tiles, { borderLeftWidth: 0 }]}
                        onPress={() => this.onTilePress(1, 0)}>
                        {this.renderIcon(1, 0)}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tiles, {}]} onPress={() => this.onTilePress(1, 1)}>
                        {this.renderIcon(1, 1)}

                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tiles, { borderRightWidth: 0 }]}
                        onPress={() => this.onTilePress(1, 2)}>
                        {this.renderIcon(1, 2)}

                    </TouchableOpacity>
                </View>
                <View style={styles.flexRow}>
                    <TouchableOpacity style={[styles.tiles, { borderLeftWidth: 0, borderBottomWidth: 0 }]}
                        onPress={() => this.onTilePress(2, 0)}>
                        {this.renderIcon(2, 0)}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tiles, { borderBottomWidth: 0 }]}
                        onPress={() => this.onTilePress(2, 1)}>
                        {this.renderIcon(2, 1)}

                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tiles, { borderRightWidth: 0, borderBottomWidth: 0 }]}
                        onPress={() => this.onTilePress(2, 2)}>
                        {this.renderIcon(2, 2)}

                    </TouchableOpacity>
                </View>
                <View style={{ padding: 20 }} />
                <Button title='New Game' onPress={this.initializeGame} />
                <TouchableOpacity onPress={() => this.props.changeComponent('One')}>
                    <Text style={styles.btntext}>Cancel</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#36485f',
    },
    player: {
        backgroundColor: 'red',
        color: 'white',
        padding: 5,
        marginBottom: 60,
        alignSelf: 'flex-start',
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tiles: {
        borderWidth: 5,
        width: 100,
        height: 100,
        justifyContent: 'center'
    },
    tileX: {
        fontSize: 60,
        color: 'red',
        alignSelf: 'center'
    },
    tileO: {
        fontSize: 60,
        color: 'green',
        alignSelf: 'center'
    },
    cancelbtn: {
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
        fontWeight: 'bold',
        paddingTop:20
    }
});
