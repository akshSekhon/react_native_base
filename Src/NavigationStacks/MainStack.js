

import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import { Navigations, } from '../Constants/Enums';
import TabNavigator from "./TabNavigator";
// import { HomeScreen } from '../Screens/ScreenIndex';
import * as screens from "../Screens/ScreenIndex"
const MainStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, }}>
            <Stack.Screen name={Navigations.TabBar} component={TabNavigator} />
        {/* <Stack.Screen name={Navigations.ForgotPassword} component={screens.ForgotPassword} />
        <Stack.Screen name={Navigations.ResetPassword} component={screens.ResetPassword} />
        <Stack.Screen name={Navigations.OtpVerification} component={screens.OtpVerification} /> */}
        
        </Stack.Navigator >

    )
}
export default MainStack;


