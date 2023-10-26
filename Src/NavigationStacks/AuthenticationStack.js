

import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import { useSelector } from 'react-redux';
import { Navigations, } from '../Constants/Enums'
import * as screens from "../Screens/ScreenIndex"

const AuthenticationStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen name={Navigations.Login} component={screens.Login} />
      <Stack.Screen name={Navigations.SignUp} component={screens.SignUp} />
      <Stack.Screen name={Navigations.ForgotPassword} component={screens.ForgotPassword} />
      <Stack.Screen name={Navigations.ResetPassword} component={screens.ResetPassword} />
      <Stack.Screen name={Navigations.OtpVerification} component={screens.OtpVerification} />
      </Stack.Navigator >

  )
}
export default AuthenticationStack;