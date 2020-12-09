import React, {useContext, useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './AuthStack';
import ApplicationNavigator from './AppStack';
import LoginScreen from '../screens/LoginScreen';

const Routes = () => {
    
    global.Myuser = false;
    console.log("dit is de user",global.Myuser)

    return(
        <NavigationContainer>
            {global.Myuser ? <ApplicationNavigator /> : <AuthNavigator/>}
        </NavigationContainer>
    );
};

export default Routes;