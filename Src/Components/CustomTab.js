import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


import colors from '../styles/colors';
import commonStyles from '../styles/commonStyles';
import { moderateScale, scale } from '../styles/responsiveSize';
import { ImageEnum } from '../Constants';

const CustomTab = ({ color, tab, onPress, icon, activeTabCheck }) => {
    console.log(activeTabCheck, "activeTabCheck");
    // const {unreadNotifications} = useSelector((state)=>state.auth)

    // const notiFyData = [{screen:Navigations.HomeScreen,notifi:false},
// ]

    // const noti = notiFyData.find((item) => item?.screen == tab?.name)
    // console.log('noti noti noti noti :---',tab.name);
    return (
        <TouchableOpacity style={{}}onPress={onPress}>
          

            <View style={{alignItems:'center',justifyContent:'center'}}>
                <View>
                {/* { noti?.notifi == true &&
            <View style={{ position: 'absolute', height: 6, width: 6, top: -2,right:-6,alignSelf:'flex-end',backgroundColor: 'red', borderRadius: 5, }} />

            } */}
                <Image source={icon} 
                resizeMode='contain'
                style={[styles.tabIconStyle, {tintColor: activeTabCheck?.active == activeTabCheck?.index ? colors.theme : colors.gary11 }]} />
                </View>
                <Text
                    style={[styles.tabBarLabelStyle, { ...commonStyles.fontSize12, color: activeTabCheck?.active == activeTabCheck?.index ? colors.theme : colors.gary11 }]} >
                    {tab.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      // marginHorizontal: 15,
    },tabIconStyle: {
        alignSelf: 'center',
        height: scale(22),
        width: scale(22),
        resizeMode: ImageEnum.contain
      },
      tabBarLabelStyle: {
        ...commonStyles.fontSize16,
        marginTop: moderateScale(4),
        justifyContent: 'center'
      }
  });

export default CustomTab;