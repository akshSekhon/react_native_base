//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import actions from '../../../redux/actions';
import { useSelector } from 'react-redux';

// create a component
const Home = () => {
    const { profileDetail } = useSelector((state) => state?.auth?.userData)//token
console.log('profileDetail profileDetail : ---',profileDetail);
    const onPressLogout = () => {
        actions.userLogout(profileDetail?._id)
    }
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, backgroundColor: 'white' }}
                onPress={onPressLogout}
            >Logout</Text>

            <Text style={{ fontSize: 20 }}>Home</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
});

//make this component available to the app
export default Home;
