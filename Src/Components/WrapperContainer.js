import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import colors from '../styles/colors';
import {moderateScale} from '../styles/responsiveSize';
import CustomLoader from './CustomLoader';
import { useSelector } from 'react-redux';

const WrapperContainer = ({
  children,
  statusBarAvailable = true,
  isSafeAreaAvailable = true,
  onlyScrollViewAvailable = false,
  scrollViewBouncesEnable = false,
  paddingAvailable = true,
  mainViewStyle,
  refreshControl,
  contentContainerStyle,
  isLoading = true
}) => {
const load = useSelector((state)=> state?.appReducerData?.appLoading)

  function WithOnlyScrollView() {
    return (
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        onResponderMove={() => console.log('hellojhjkhkjhkj')}
        bounces={scrollViewBouncesEnable}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(60),
          flexGrow: 1,
          ...contentContainerStyle,
        }}
        refreshControl={refreshControl}
        stickyHeaderIndices={[0]}>
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      style={{
        ...styles.container,
        paddingHorizontal: paddingAvailable ? moderateScale(16) : 0,
        backgroundcolor: colors.white,
        ...mainViewStyle,
      }}>
      {statusBarAvailable ? (
        <StatusBar
        backgroundColor={colors.white}
          barStyle={!isSafeAreaAvailable ? 'light-content' : 'dark-content'}
          showHideTransition={'slide'}
          hidden={false}
        />
      ) : (
        <></>
      )}
      {isSafeAreaAvailable ? <SafeAreaView /> : <></>}
      {onlyScrollViewAvailable ? WithOnlyScrollView() : children}
     {(load && isLoading)&& <CustomLoader/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default React.memo(WrapperContainer);