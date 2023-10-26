
//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Components from '../../Components/CompoIndex'
import En from '../../Constants/En';
import { Formik } from 'formik';
import { forgotPassValidationSchema, loginValidationSchema, } from '../../HelperFiles/validations';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScale, moderateScaleVertical, scale } from '../../styles/responsiveSize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import commonStyles from '../../styles/commonStyles';
import colors from '../../styles/colors';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, } from 'react-native-confirmation-code-field';
import { Navigations } from '../../Constants';
import fontFamily from '../../styles/fontFamily';
import { useDispatch } from 'react-redux';
import actions from '../../redux/actions';
import { pushTo } from '../../HelperFiles/HelperFunction';

const OtpVerification = ({ navigation, route  }) => {
    const lastScreenData = route?.params
    const [bottomMargin, setbottomMargin] = useState(0)
//    console.log('lastScreenData lastScreenData :---',lastScreenData);
    const dispatchAction = useDispatch()
    const CELL_COUNT = 6;
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false)
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(30);

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useEffect(() => {
        
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    const resendOTP = () => {
        setMinutes(1);
        setSeconds(30);
    };

    function onPressResendOtp() {
        usersResendOtp()
    }
   
        // actions.setIsApploading(false)

    const onPressContinue = async (data) => {
        let registerPayload = {
            email:lastScreenData?.email ?? '',
            otp:value,
        }
        // actions.setIsApploading(true)
        await userSignUpOtpVerify(registerPayload)
        // navigation.navigate(Navigations.ForgotPassword)
    }
    // const _onSubmitFormData = async (data) => {
    //     await userSignUpOtpVerify(data)
    //     // showAlertMessage('user sign up sucessfull')
    // }
    // console.log('lastScreenData.lastScreenData res : --',lastScreenData);
    const userSignUpOtpVerify = async (data) => {
      
        const request = lastScreenData?.lastScreen == Navigations.SignUp ? actions.userSignupOtpVerify(data):actions.userOtpVerify(data)
        request.then((res) => {
          console.log('Components.WrapperContainer res : --',res);
          if (lastScreenData?.lastScreen !== Navigations.SignUp){
            
            const payload = {...res?.data,lastScreen:Navigations.OtpVerification}
            pushTo(Navigations.ResetPassword,payload)
          }
        //   const payload = res?.data
        //    pushTo(Navigations.OtpVerification,payload)
        }).catch((error) => {
            console.log('Components.WrapperContainer error: ---', error);
          })
    }

    // const userNewPassOtpVerify = async (data) => {
    //     actions.userOtpVerify(data).then((res) => {
    //       console.log('Components.WrapperContainer res : --',res);
    //       const payload = res?.data
    //     //    pushTo(Navigations.OtpVerification,payload)
    //     }).catch((error) => {
    //         console.log('userNewPassOtpVerify error: ---', error);
    //       })
    // }

    const usersResendOtp = async () => {
        resendOTP()
        let resendPayload = {
            email:lastScreenData,
        }
        actions.userResendOtp(resendPayload).then((res) => {
          console.log('usersResendOtp res : --',res);
        //   const payload = res?.data
        //    pushTo(Navigations.OtpVerification,payload)
        }).catch((error) => {
            console.log('usersResendOtp error: ---', error);
          })
    }

    return (
        <Components.WrapperContainer>
            <Components.AuthWrapper
                screenName={Navigations.OtpVerification}
                payloadData={lastScreenData}
            >
                <View>

                    {/* <KeyboardAwareScrollView
                        // contentContainerStyle={{paddingBottom:200}}
                        endFillColor={'red'}
                        enableOnAndroid={true}
                        // extraHeight={250}
                        onKeyboardWillShow={(val) => {
                            console.log('Keyboard event', val)
                            if (touched == touched?.confimPass) {
                                setbottomMargin(250)
                            }
                        }}

                        onKeyboardDidHide={(val) => {
                            console.log('Keyboard event', val)
                            setbottomMargin(0)
                        }}
                    > */}

                        <View style={{ gap: moderateScaleVertical(10), }}>


                            {/* MARK:-- Otp Text Inputs */}

                            <View style={{gap:moderateScaleVertical(5)}}>
                                <CodeField
                                    ref={ref}
                                    {...props}
                                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                                    value={value}
                                    onChangeText={setValue}
                                    cellCount={CELL_COUNT}
                                    rootStyle={styles.codeFieldRoot}
                                    keyboardType="number-pad"
                                    textContentType="oneTimeCode"
                                    renderCell={({ index, symbol, isFocused, }) => (
                                        <Text
                                            key={index}
                                            style={[styles.cell, isFocused && styles.focusCell]}
                                            onLayout={getCellOnLayoutHandler(index)}>
                                            {symbol || (isFocused ? <Cursor /> : null)}
                                        </Text>
                                    )}
                                />
                                <View style={{justifyContent:'center',alignItems:'flex-end'}}>
                                    {seconds > 0 || minutes > 0 ?
                                            <Text style={{
                                                ...commonStyles.fontSemiBold14, color: colors.theme
                                                // fontSize: 14
                                            }} >
                                                {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                                            </Text>
                                         :
                                        <Text onPress={() => onPressResendOtp()} style={{ ...commonStyles.fontSemiBold14, color: colors.theme }} >{En.Resend_OTP} </Text>
                                    }
                                </View>
                            </View>

{/* MARK: ---- Otp Verify Button container  */}
                            <View style={{ gap: moderateScaleVertical(8), marginTop: moderateScaleVertical(25) }}>
                                <Components.CustomButton
                                    containerStyle={{}}
                                    title={En.Verify_OTP}
                                    isdisable={value.length < 6 ? true : false}
                                    onPress={onPressContinue}
                                />
                                <View style={styles.resendContainer}
                                >
                                    <Text style={{ ...commonStyles.fontMedium14 }}>
                                        {En.Didnt_recieve_the_OTP}
                                    </Text>

                                    {seconds > 0 || minutes > 0 ?
                                        <View
                                            style={{ flexDirection: 'row', alignItems: "center", }}
                                        >
                                            <Text style={{
                                                ...commonStyles.fontSemiBold14, color: colors.theme
                                                // fontSize: 14
                                            }} >
                                                {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                                            </Text>
                                        </View> :
                                        <Text onPress={() => onPressResendOtp()} style={{ ...commonStyles.fontSemiBold14, color: colors.theme }} >{En.Resend_OTP} </Text>
                                    }
                                </View>

                            </View>
                        </View>

                    {/* </KeyboardAwareScrollView> */}

                </View>
            </Components.AuthWrapper>
        </Components.WrapperContainer>

    );

};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    }, codeFieldRoot: { gap: 5, alignItems: 'center', justifyContent: 'space-around' },//marginBottom:moderateScale(10),marginHorizontal: moderateScale(20)
    cell: {
        // width: scale(50),
        flex: 1,
        height: scale(50),
        lineHeight: scale(65),
        fontFamily: fontFamily.regular,
        fontSize: 24,
        borderBottomWidth: 2,
        borderColor: colors.borderGrayColor,
        textAlign: 'center',
        // backgroundColor: colors.white,
        overflow: 'hidden',
        color: colors.textBlack,
        // marginHorizontal:moderateScale(2)

    },
    focusCell: {
        borderColor: colors.theme,
        fontFamily: fontFamily.regular,
        color: colors.theme,
    }, timerDotStyle: {
        fontSize: moderateScale(18),
        paddingBottom: moderateScale(3)
    }, resendContainer: {
        flexDirection: 'row', alignItems: 'center', gap: 5,
    },

});

//make this component available to the app
export default OtpVerification;
