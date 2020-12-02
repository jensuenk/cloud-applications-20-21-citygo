import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Onboarding from 'react-native-onboarding-swiper';
import { windowWidth } from '../utils/Dimentions';

const Done = ({... props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
        ><Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const WelcomeScreen = ({ navigation }) => {
    return (
        <Onboarding
            DoneButtonComponent={Done}
            onSkip={() => navigation.navigate("Login")}
            onDone={() => navigation.navigate("Login")}
            pages={[
                {
                    backgroundColor: '#ffff',
                    image: <Image style={styles.imagestyle1} source={require('../assets/LogoPagina1.png')} />,
                    title: 'Welkom!',
                    subtitle: 'Bedankt om de CityGo app te downloaden',
                },
                {
                    backgroundColor: '#ffff',
                    image: <Image style={styles.imagestyle2} source={require('../assets/LogoPagina2.png')} />,
                    title: 'Zoek en Speel!',
                    subtitle: 'Zoek de plaatsen om raadsels op te lossen en speel om punten te verzamelen',
                },
                {
                    backgroundColor: '#ffff',
                    image: <Image style={styles.imagestyle3} source={require('../assets/LogoPagina3.png')} />,
                    title: "Ontdek 't Stad!",
                    subtitle: 'Leer Antwerpen kennen op een speelse manier, zoals nooit tevoren!',
                },
            ]}
        />
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagestyle1: {
        width: 260,
        height: 350,
    },
    imagestyle2:{
        width: 310,
        height: 350,
    },
    imagestyle3: {
        width: windowWidth,
        height:300,
    },

});