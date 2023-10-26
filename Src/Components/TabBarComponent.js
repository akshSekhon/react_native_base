import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
// import { moderateScale } from "../Styles/responsiveSize";
// import Constants from "../Constants/Constants";
// import Colors from "../Colors/Colors";
import { Navigations } from "../Constants";
import colors from "../styles/colors";
import { moderateScale } from "../styles/responsiveSize";
import CustomTab from "./CustomTab";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import CustomTab from "./CustomTab";

const TabBarComponent = ({ state, navigation }) => {
    const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(Navigations.Home);
  const { routes, index } = state;
  const TabInx = index;
  const renderColor = (currentTab) =>
    currentTab === selected ? colors.gary11 : colors.theme;

  const handlePress = (activeTab, index) => {
    if (state.index !== index) setSelected(activeTab);
    navigation.navigate(activeTab);
  };

  return (
    <SafeAreaView style={{...styles.wrapper,bottom:insets.bottom}}>
      <View style={{...styles.container}}>
        {routes.map((route, index) => {
          return (
            <View key={index} style={{flexGrow:1,}}>

           <CustomTab
              tab={route}
              icon={route.params.icon}
              onPress={() => handlePress(route.name, index)}
              color={renderColor(route.name)}
              key={route.key}
              activeTabCheck={{ active: TabInx, index: index }}
            /> 
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // position: "absolute",
    // bottom: 0,
    // flex:1,
    // width: "100%",
    paddingTop:moderateScale(10),
    backgroundColor: colors.white,
    justifyContent: "center",
    borderTopColor:colors.lightBorderColor,
    borderTopWidth:moderateScale(1.5),
  },
  container: {
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: colors.white,
    // paddingVertical: moderateScale(10),
  },
});

export default TabBarComponent;
