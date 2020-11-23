import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import GoogleButton from '../components/GoogleButton';
import StandardButton from '../components/StandardButton';
import InputField from '../components/InputField';
import Firebase from '../config/Firebase';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();



    function handleLogin() {
        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(navigation.navigate("Main"))
            .catch(error => console.log(error))
    }


    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/LogoWelcome.png')}
                style={styles.logo}
            />
            <InputField
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <InputField
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <StandardButton
                buttonTitle="Log In"
                onPress={() => { handleLogin() }}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate("Register")}>
                <Text style={styles.navButtonText} >Not registered yet? Register here</Text>
            </TouchableOpacity>

        </View>
    );

    /*<InputField
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <InputField
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <StandardButton
                buttonTitle="Log In"
                onPress={() => { handleLogin() }}
            />

            <GoogleButton
                buttonTitle="Sign in with Google"
                btnType="google"
                backgroundColor="#f2ced6"
                onPress={() => { alert("Google Sign In") }}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate("Register")}>
                <Text style={styles.navBu*/

};

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
});