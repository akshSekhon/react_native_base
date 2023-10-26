//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Alert, Pressable } from 'react-native';
import { CommonStyles, TextStyles } from '../Styles/ComnStyle';
// import ImagePath from '../Constants/ImagePath';
// import LinearGradient from 'react-native-linear-gradient';
// import Colors from '../Colors/Colors';


import { moderateScale, moderateScaleVertical } from '../styles/responsiveSize';
import commonStyles from '../styles/commonStyles';
import ComponentStyles from '../styles/ComponentStyles';
import colors from '../styles/colors';
import ImagePath from '../Constants/ImagePath';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {BallIndicator,BarIndicator,DotIndicator,MaterialIndicator,PacmanIndicator,PulseIndicator,SkypeIndicator,UIActivityIndicator,WaveIndicator,} from 'react-native-indicators';

// create a component
const CustomButton = ({
    containerStyle, titleStyle, title, onPress, onDisablePress,
    isdisable = false,
    bgColors = colors.theme,
    isloading = false
}) => {

    return (
        // <View>
        <Pressable
            style={{ ...ComponentStyles.button,...styles.linearGradiant, backgroundColor: !isdisable ? bgColors : colors.silver, ...containerStyle }}
            underlayColor={colors.white}
            onPress={!isdisable ? onPress : onDisablePress}
        >
            <>
            {!isloading &&
            <Text style={{ ...commonStyles.fontMedium16,...styles.btnText, ...titleStyle }} >
                {title}
            </Text>
            }
            {isloading &&
            <View style={{flex:1}}>
            <MaterialIndicator color={isdisable ? bgColors : colors.white} size = {25}/> 
            </View>
             }
             </>
        </Pressable>
        // </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    linearGradiant: {
        paddingVertical:moderateScaleVertical(15),
    },
    btnText:{
        color:colors.white
    }
});

//make this component available to the app
export default CustomButton;
