import React, { Component, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import StandardButton from '../components/StandardButton';
import InputField from '../components/InputField';

import Firebase from '../config/Firebase';


class RegisterScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            isValidEmail: true,
            isValidPassword: true,
            isInvalidInput: true,
            isvalidUsername: true,
            isValidName: true,
            users: [],
            userId: 1,
            name: "",
            username: "",
            email: "",
            balls: 0,
            friendIds: null,
            items: null,
            usersItems: [],
            challenges: [],
            friends: null,
            userFriends: null,
        }
    }

    //Deze Asynchronische functie zorgt er voor dat er een GET request naar de API gestuurd wordt, om de gegevens van de reeds geregistreerde users na te kunnen gaan
    async apiCallUsers() {
        let responseApiUsers = await fetch('https://citygo-ap.azurewebsites.net/Users/');
        let responseJsonUsers = await responseApiUsers.json();
        this.setState({ users: responseJsonUsers.users })
        console.log("API werd gecalld");
    }

    async apiPostNewUser() {
        // POST request with all variables of the User in the API -> name, username, email, balls, score, pictureURL, friends ID, items, userItems, userChallenges, Friends and userFriends
        const PostRequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                username: this.state.username,
                email: this.state.email,
                balls: 0,
                score: 0,
                picrtureURL: null,
                friendIds: null,
                items: null,
                usersItems: [],
                usersChallenges: [],
                friends: null,
                userFriends: null,
            })
        };
        await fetch('https://citygo-ap.azurewebsites.net/Users/', PostRequest)
            .then(response => response.json())
            //.then(data => console.log(data)) // Kijken wat de teruggekregen data is, evt analyseren
            //.catch(err => console.log(err)) // De error opvangen, evt gebruiken
    }

    //Bij laden van het scherm, wordt de API gelezen. Dit wordt enkel herhaald bij het herladen van het scherm.
    componentDidMount = () => {
        this.apiCallUsers();
    }

    handleSignUp = () => {
        this.apiPostNewUser();  //bij het aanmaken van de user, wordt de POST request naar de API gestuurd met de input van de velden
        Firebase.auth()         //User wordt aangemaakt in FireBase -> voor authenticatie (veiliger dan wanneer we deze info in de API zouden bewaren)
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('LoginScreen'))
            .catch(error => console.log(error))
    }

    //Het wachtwoord moet langer dan 5 tekens zijn
    handleValidPassword = (val) => {
        if (val.trim().length >= 5) {
            this.state.isValidPassword = true;
        }
        else {
            this.state.isValidPassword = false;
        }
    }

    //De opgegeven naam moet langer zijn dan 1 teken, dus niet nul en moet bestaan uit tekens, geen letters
    handleValidName = (val) => {
        if (val.trim().length >= 1 && isNaN(val)) {
            this.state.isValidName = true;
        }
        else {
            this.state.isValidName = false;
        }

        if (this.state.isValidName == false) {
            alert("The name has to be a string value longer than 1 char.");
        }
    }

    //De Email moet voldoen aan de regex van een email "XX@domain.com" Een doorsnee email is ook langer dan 5 tekens
    handleValidEmail = (val) => {
        var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

    /*
    handleLengthUsername = (val) => {
        if (val.trim().length >= 1) {
            //this.state.isvalidUsername = true;
        }
        else {
            this.state.isvalidUsername = false;
        }
    }*/

    //De username moet langer zijn dan 1 teken, daarna wordt er gecheckt of de username die ingevoerd is al bestaat in de API, als dat is, krijgt de gebruiker een alert
    handleValidUsername = (val) => {
        if (val.trim().length >= 1) {
            for (let item of this.state.users) {
                if (item.username == val) {
                    alert("De ingevoerde username " + item.username + " is al in gebruik. Probeer een andere username.");
                    this.state.isvalidUsername = false;
                    break;
                }
                else {
                    this.state.isvalidUsername = true;
                }
            }
        }
        else{
            this.state.isvalidUsername = false;
            alert("De username moet langer zijn dan 1 teken");
        }
    }

    handleRegister = () => {
        if (this.state.isValidName) {
            if(this.state.name==""){
                alert("Geef input bij de naam");
                return;
            }
            console.log("name: ", this.state.name);
            if (this.state.isvalidUsername) {
                if (this.state.username == "") {
                    alert("Geef input bij de username");
                    return;
                }
                console.log("username: ", this.state.username);
                if (this.state.isValidPassword) {
                    if (this.state.password == "") {
                        alert("Geef input bij het password");
                        return;
                    }
                    console.log("password: ", this.state.password);
                    if (this.state.isValidEmail) {
                        if (this.state.email == "") {
                            alert("Geef input bij de email");
                            return;
                        }
                        console.log("email: ", this.state.email);
                        this.handleSignUp();
                    } else {
                        alert("There is still invalid input, check each field before pushing the registration button.");
                    }
                } else {
                    alert("There is still invalid input, check each field before pushing the registration button.");
                }
            } else {
                alert("There is still invalid input, check each field before pushing the registration button.");
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Create your profile here!</Text>
                <InputField
                    labelValue={this.state.name}
                    onChangeText={(name) => this.setState({ name }, (name) => this.handleValidName(this.state.name))}
                    placeholderText="Name"
                    iconType="user"
                    secureTextEntry={false}
                    autoCapitalize="none"
                />

                <InputField
                    labelValue={this.state.username}
                    onChangeText={(username) => this.setState({ username }, (username) => this.handleValidUsername(this.state.username))}
                    placeholderText="Username"
                    iconType="user"
                    secureTextEntry={false}
                    autoCapitalize="none"
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
                {this.state.isValidEmail ? null :
                    <Text style={styles.errorMessage}>The email needs to look like xxx@domain</Text>
                }

                <InputField
                    labelValue={this.state.password}
                    onChangeText={(password) => this.setState({ password }, (password) => this.handleValidPassword(this.state.password))}
                    placeholderText="Password"
                    iconType="lock"
                    secureTextEntry={true}
                />
                {this.state.isValidPassword ? null :
                    <Text style={styles.errorMessage}>The password needs to be 6 characters long</Text>
                }

                <View>
                    <Text style={styles.textPrivate}>By registering you agree with our Terms of Service and Privacy Policy.</Text>
                </View>

                <StandardButton
                    buttonTitle="Register Now"
                    onPress={() => { this.handleRegister() }}
                />

                <TouchableOpacity style={styles.forgotButton} onPress={() => this.props.navigation.navigate('LoginScreen')}>
                    <Text style={styles.navButtonText} >Already registered? Sign in</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
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
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#2e64e5',
    },
    textPrivate: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 19,
        textAlign: "center",
    },
    errorMessage: {
        color: '#FE0000',
    },
    errorMessage2: {
        color: '#FE0000',
        fontSize: 23,
    }
});