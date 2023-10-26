//import liraries
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import TabBarComponent from '../Components/TabBarComponent';
import { View } from 'react-native';
import { Navigations } from '../Constants';

import ImagePath from '../Constants/ImagePath';
import TabBarComponent from '../Components/TabBarComponent';

import * as screens from '../Screens/ScreenIndex'
const Tab = createBottomTabNavigator();

// create a component
const TabNavigator = () => {
    return (
        //TabBarComponent {...props}
        <Tab.Navigator
            screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true, tabBarStyle: { position: 'absolute' }, }} tabBar={(props) => <TabBarComponent {...props} />}>
            <Tab.Screen options={{ tabBarHideOnKeyboard: true, unmountOnBlur: true }} name={Navigations.Home} component={screens.Home} initialParams={{ icon: ImagePath.home }} />
            <Tab.Screen options={{ tabBarHideOnKeyboard: true, unmountOnBlur: true }} name={Navigations.Expolre} component={screens.Explore} initialParams={{ icon: ImagePath.explosure }} />
            <Tab.Screen options={{ tabBarHideOnKeyboard: true, unmountOnBlur: true }} name={Navigations.Accounts} component={screens.Accounts} initialParams={{ icon: ImagePath.account }} />
            {/* <Tab.Screen options={{ tabBarHideOnKeyboard: true, unmountOnBlur: true }} name={Navigations.HomeScreen} component={HomeScreen} initialParams={{ icon: ImagePath.eyeOpen }} /> */}
        </Tab.Navigator>
    );

};


//make this component available to the app
export default TabNavigator;


