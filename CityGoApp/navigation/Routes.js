import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthorizationStack from './AuthorizationStack';

const Routes = () => {

    return (
        <NavigationContainer>
            <AuthorizationStack />
        </NavigationContainer>
    );
};

export default Routes;