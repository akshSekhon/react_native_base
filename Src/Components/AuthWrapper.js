import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import colors from '../styles/colors';
import { moderateScale, moderateScaleVertical, textScale } from '../styles/responsiveSize';
import ComponentStyles from '../styles/ComponentStyles';
import En from '../Constants/En';
import commonStyles from '../styles/commonStyles';
// import { En } from '../Constants/ConstIndex';
import { Navigations } from '../Constants';
import { securedEmailText } from '../HelperFiles/HelperFunction';
const AuthWrapper = ({
  children,screenName ,payloadData, mainViewStyle
}) => {

  const headersArr = {
    Login: { title: En.Login, subtitle: En.Enter_your_credentials_to_start_your_journey },
    SignUp: { title: En.Register, subtitle: En.Add_your_details_to_begin_your_registration },
    ForgotPassword: { title: En.Forgot_Password, subtitle: En.Add_Email_to_reset_password },
    OtpVerification: { title: En.OTP_Verification, subtitle: En.Enter_the_OTP_sent_on_},
    ResetPassword: { title: En.Reset_Password, subtitle: En.Create_a_new_password },
  }
  const selectedHeaher = headersArr[screenName ?? '']
if (!screenName){
  return<></>
}
const emaiText =   payloadData?.email && <Text style={{ ...commonStyles.fontSemiBold13, }} >{securedEmailText(payloadData?.email)} </Text>
  return (
    <View
      style={{
        ...ComponentStyles.container, paddingHorizontal: moderateScale(10), backgroundcolor: colors.white, ...mainViewStyle,
      }}>
      <View style={{ alignItems: 'flex-start', marginTop: moderateScaleVertical(35),paddingBottom:20, gap: -5 }}>
        <Text style={{ ...commonStyles.fontMedium40, }} >{selectedHeaher?.title}</Text>
        <Text style={{ ...commonStyles.fontMedium14,color:colors.blackOpacity70 }}>{selectedHeaher?.subtitle}{emaiText} </Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'white',
  },
});

export default React.memo(AuthWrapper);