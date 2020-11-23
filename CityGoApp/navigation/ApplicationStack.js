import React from "react";
import MainScreen from "../screens/MainScreen";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

const ApplicationStack=()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name='Map' component={MainScreen}/>
        </Stack.Navigator>
    );
}
export default ApplicationStack;
