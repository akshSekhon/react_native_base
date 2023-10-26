import React from "react";
import {View, StyleSheet,Image } from "react-native";

import { ImageEnum, ImagePath } from "../Constants";

import {BallIndicator,BarIndicator,DotIndicator,MaterialIndicator,PacmanIndicator,PulseIndicator,SkypeIndicator,UIActivityIndicator,WaveIndicator,} from 'react-native-indicators';
import colors from "../styles/colors";
import { scale, width } from "../styles/responsiveSize";
 const CustomLoader = ({containerStyle,imageStyle}) => {
    
    return (
        <View style={{...styles.container,...containerStyle}}>
             <SkypeIndicator color={colors.theme} /> 
        {/* <Image source={ImagePath.loader_gif} style={{...styles.loaderImg,...imageStyle}}/> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        backgroundColor:colors.blackOpacity20,
    },
    containerStyle:{
        backgroundColor:'red'
    },
    loaderImg:{
        height:scale(60), 
        width:scale(60),
        resizeMode:ImageEnum.contain
    }
})
export default CustomLoader;