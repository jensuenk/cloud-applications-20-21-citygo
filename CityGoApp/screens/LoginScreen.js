import React, { createContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, Animatable } from 'react-native';
import StandardButton from '../components/StandardButton';
import InputField from '../components/InputField';
import Firebase from '../config/Firebase';

import AuthNavigator from '../navigation/AuthStack';
import ApplicationNavigator from '../navigation/AppStack';
import { NavigationContainer } from '@react-navigation/native';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nameUser: '',
            email: '',
            password: '',
            isValidEmail: true,
            isValidPassword: true,
            isValidLogin: true,
            currentUser: null,
            userId: 1,
            name: "",
            username: "",
            email: "",
            balls: 0,
            score: 0,
            picrtureURL: null,
            friendIds: null,
            items: null,
            usersItems: null,
            usersChallenges: null,
            friends: null,
            userFriends: null,
            location: null,
            online: true,
        };
        global.Myuser = false;
        global.uid;
    }

    handleValidPassword = (val) => {
        if (val.trim().length >= 5) {
            this.state.isValidPassword = true;
        }
        else {
            this.state.isValidPassword = false;
        }
    }

    handleValidEmail = (val) => {
        global.emailUser = this.state.email;
        var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (val.trim().length >= 5) {
            if (regEmail.test(val)) {
                this.state.isValidEmail = true;
            }
            else {
                this.state.isValidEmail = false;
            }
        }
        else {
            this.state.isValidEmail = false;
        }
    }

    //get request: opvragen van user bij de login functie. De user id kan worden gebruikt voor andere functies
    async apiCallUserEmail() {
        console.log("global email: ", global.emailUser);
        let responseApiUserEmail = await fetch('https://citygoaspbackend20201224141859.azurewebsites.net/Users/' + global.emailUser + '/email');
        let responseJsonUserEmail = await responseApiUserEmail.json();
        console.log("get request: ", responseJsonUserEmail);
        global.uid = responseJsonUserEmail.userId;
        console.log("userId: ", responseJsonUserEmail.userId);
        console.log("userId: ", global.uid);
    }

    authSuccessfull = () => {
        global.Myuser = true;
        this.props.navigation.navigate("MainScreen");
    }

    authNotSuccessfull = (val) => {
        errorCode = val.code;
        errorMessage = val.message;
        if (errorCode === 'auth/invalid-password') {
            console.log("Invalid password");
            alert('Invalid password.');
        } else {
            if (errorCode === 'auth/invalid-email') {
                console.log("Invalid email");
                alert('Invalid email.');
            } else {
                this.apiCallUserEmail(); //call users to find UID
                this.props.navigation.navigate('MainScreen'); //navigate to the MAP screen
            }
        }
    }

    handleLogin = () => {
        if (this.state.password == "") {
            alert('Give input to all fields');
            return;
        } else {
            if (this.state.email == "") {
                alert('Give input to all fields');
                return;
            } else {
                if (this.state.password.trim().length <= 5) {
                    alert('give a password longer than 6 signs.');
                    return;
                } else {
                    Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                        .then(this.authSuccessfull) //Authentication was successfull
                        .catch(error => this.authNotSuccessfull(error))
                }
            }
        }
    }

    /*
    handleLogin = () => {
        Firebase.auth()
            .signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(global.Myuser = true, this.props.navigation.navigate("MainScreen"),this.apiCallUserEmail())
            .catch(error=> console(error))
    } 
    */

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../assets/LogoWelcome.png')}
                    style={styles.logo}
                />
                <InputField
                    labelValue={this.state.email}
                    onChangeText={(email) => this.setState({ email }, (email) => this.handleValidEmail(this.state.email))}
                    placeholderText="Email"
                    iconType="user"
                    secureTextEntry={false}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                { this.state.isValidEmail ? null :
                    <Text style={styles.errorMessage}>The email needs to look like xxx@domain.</Text>
                }

                <InputField
                    labelValue={this.state.password}
                    onChangeText={(password) => this.setState({ password }, (password) => this.handleValidPassword(this.state.password))}
                    placeholderText="Password"
                    iconType="lock"
                    secureTextEntry={true}
                />
                { this.state.isValidPassword ? null :
                    <Text style={styles.errorMessage}>The password needs to be 6 characters long.</Text>
                }


                <StandardButton
                    buttonTitle="Log In"
                    onPress={() => { this.handleLogin() }}
                />

                <TouchableOpacity style={styles.forgotButton} onPress={() => this.props.navigation.navigate('RegisterScreen')}>
                    <Text style={styles.navButtonText} >Not registered yet? Register here</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ebeced',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        height: 200,
        width: 200,
        resizeMode: 'cover',
        marginBottom: 30,
        marginTop: 30,
    },
    text: {
        fontSize: 27,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 20,
    },
    navButtonText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#2e64e5',
    },
    errorMessage: {
        color: '#FE0000',
    }
});