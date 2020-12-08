import { StyleSheet, View, Text } from 'react-native';
import * as React from 'react';
import Map from './Map';
import StandardButton from '../components/StandardButton';
import Firebase from '../config/Firebase';


const MainScreen = ({ navigation }) => {

    function signOut() {
        Firebase.auth()
            .signOut()
            .then(() => navigation.navigate("Login"))
            .catch(error => console.log(error))
    }

    return (
        <View style={styles.container}>
            <Text>MAIN screen</Text>

            <StandardButton
                buttonTitle="Log Out"
                onPress={() => { signOut() }}
            />
        </View>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ebeced',
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    text: {
        color: "#000000",
        fontSize: 20,
    },
});

