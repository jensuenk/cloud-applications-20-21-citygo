import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AsyncStorage from '@react-native-community/async-storage';
import MainScreen from '../screens/MainScreen';

const Stack = createStackNavigator();

const AuthorizationStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
    let routeName;

    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then(value => {
            if (value == null) {
                AsyncStorage.setItem('alreadyLaunched', 'true');
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        });
    }, []);

    if (isFirstLaunch == null) {
        routeName = 'Login';
    } else if (isFirstLaunch == true) {
        routeName = 'Welcome';
    } else {
        routeName = 'Login';
    }

    return (
        <Stack.Navigator initialRouteName={routeName}>
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{header: () => null}}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ header: () => null }}
            />
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen 
                name="Main" 
                component={MainScreen}
                options={{ header: () => null }}
            />
        </Stack.Navigator>
    );
};

export default AuthorizationStack;