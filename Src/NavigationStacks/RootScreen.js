import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import AuthenticationStack from '../NavigationStacks/AuthenticationStack';
// import NavigationService from '../Services/NavigationService';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationService from '../Services/NavigationService';
import MainStack from './MainStack';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';


function RootScreen (props) {
    // auth?.loginData
    const userData = useSelector((state)=>state?.auth?.userData)//token
    // const isSplash = useSelector((state)=>state.auth.userStartApp)
    console.log(userData,'userLoginStatus?????>>>>')
    // const Stack = createStackNavigator();
    // const Stack = createNativeStackNavigator();
        // console.log('user id is =--------   ',userLoginStatus?._id)
    return (

        <NavigationContainer ref={(navigationRef) => {
            NavigationService.setTopLevelNavigator(navigationRef);
        }}
        >


{/* <Stack.Navigator screenOptions={{headerShown: false}}> */}
        {/* {showIntroSlides == false ? MainStack(Stack) : AuthStack(Stack)} */}
        {/* {userData?.token ? <>{MainStack()}</> : <>{AuthenticationStack()}</>} */}
      {/* </Stack.Navigator> */}

             {/* <>{AuthenticationStack()}</> */}
        {/* <Stack.Screen name={Constants.splash} component={SplashScreen}  options={{gestureEnabled: false}}/> */}
        {(userData?.token) ? <>{MainStack()}</> : <>{AuthenticationStack()}</>}
        {/* {userLoginStatus?.token ? <>{MainStack()}</> : <>{AuthenticationStack()}</>} */}
      </NavigationContainer>


    );

}
export default RootScreen;
