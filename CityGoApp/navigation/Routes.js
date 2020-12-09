import React, {useContext, useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './AuthStack';
import ApplicationNavigator from './AppStack';

const Routes = () => {
    
    var user = false;

    return(
        <NavigationContainer>
            {user ? <ApplicationNavigator /> : <AuthNavigator/>}
        </NavigationContainer>
    );
};

export default Routes;