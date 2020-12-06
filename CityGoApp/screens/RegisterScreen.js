import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import StandardButton from '../components/StandardButton';
import InputField from '../components/InputField';

import Firebase from '../config/Firebase';




const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function handleSignUp() {
        Firebase.auth()
            .createUserWithEmailAndPassword(email,password)
            .then(()=> this.props.navigation.navigate("Login"))
            .catch(error=>console.log(error))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create your profile here!</Text>
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

            <InputField
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Confirm Password"
                iconType="lock"
                secureTextEntry={true}
            />

            <View>
                <Text style={styles.textPrivate}>By registering you agree with our Terms of Service and Privacy Policy.</Text>
            </View>


            <StandardButton
                buttonTitle="Register Now"
                onPress={() => { handleSignUp() }}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.navButtonText} >Already registered? Sign in</Text>
            </TouchableOpacity>

        </View>
    );
};


/*
//Saved for later
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create your profile here!</Text>
            <InputField
            ///dit wordt nog veranderd
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <InputField
                value={password}
                //labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />

            <InputField
                value={password}
                //labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Confirm Password"
                iconType="lock"
                secureTextEntry={true}
            />

            <View>
                <Text style={styles.textPrivate}>By registering you agree with our Terms of Service and Privacy Policy.</Text>
            </View>


            <StandardButton
                buttonTitle="Register Now"
                onPress={() => { handleSignUp() ; navigation.navigate("Login")}}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.navButtonText} >Have an account? Sign in</Text>
            </TouchableOpacity>

        </View>
*/

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
});