
//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Components from '../../Components/CompoIndex'
import En from '../../Constants/En';
import { Formik } from 'formik';
import { loginValidationSchema, signUpValidationSchema } from '../../HelperFiles/validations';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScaleVertical } from '../../styles/responsiveSize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import commonStyles from '../../styles/commonStyles';
import colors from '../../styles/colors';
import { Navigations } from '../../Constants';
import actions from '../../redux/actions';
import { pushTo } from '../../HelperFiles/HelperFunction';
import { useSelector } from 'react-redux';
const Login = ({ navigation }) => {
    const fcmToken = useSelector(state => state?.auth?.fcmToken)
    const [bottomMargin, setbottomMargin] = useState(0)
    const _onSubmitFormData = async (data) => {
        const { email, password } = data
        let loaginPayload = {
            email: email,
            password: password,
            deviceToken: fcmToken ?? 'fcmToken',
        }
        userLogin(loaginPayload)
    }
    const userLogin = async (data) => {
        actions.userLogin(data).then((res) => {
          console.log('Components.WrapperContainer res : --',res);
          const payload = res?.data
        //    pushTo(Navigations.OtpVerification,payload)
        }).catch((error) => {
            console.log('Components.WrapperContainer error: ---', error);
            reject(error)
          })
    }

    return (
        <Components.WrapperContainer>
            <Components.AuthWrapper
            screenName={Navigations.Login}
            >
                <View >
                    <Formik
                        validationSchema={loginValidationSchema}
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        onSubmit={_onSubmitFormData}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => {
                            return (
                                <KeyboardAwareScrollView
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
                                >

                                    <View style={{ gap: moderateScaleVertical(10), marginBottom: moderateScaleVertical(bottomMargin) }}>
                                        <Components.CustomTextInput
                                            hederText={En.Email}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values?.email}
                                            placeholder={En.Email}
                                            errorText={(errors?.email && touched?.email) && errors?.email}
                                        />
                                        <View style={{ gap: moderateScaleVertical(8), marginTop: moderateScaleVertical(15) }}>
                                            <Components.CustomTextInput
                                                hederText={En.Password}
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values?.password}
                                                placeholder={"********"}
                                                errorText={(errors?.password && touched?.password) && errors?.password}
                                                secureTextEntry={true}
                                            />
                                            <View style={{ alignItems: 'flex-end', }}>
                                                <Text style={{ ...commonStyles.fontSemiBold14, color: colors.theme, }} onPress={() => navigation.navigate(Navigations.ForgotPassword)}>{En.Forgot_Password} </Text>

                                            </View>
                                        </View>
                                        <View style={{ gap: moderateScaleVertical(8), marginTop: moderateScaleVertical(15) }}>
                                            <Components.CustomButton
                                                containerStyle={{}}
                                                title={En.Login}
                                                isdisable={!isValid}
                                                onPress={handleSubmit}
                                            />

                                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                <Text style={commonStyles.fontMedium14}>{En.Dont_have_an_account} <Text onPress={() => navigation.navigate(Navigations.SignUp)} style={{ ...commonStyles.fontSemiBold14, color: colors.theme }} >{En.Register_here} </Text></Text>

                                            </View>

                                        </View>
                                    </View>

                                </KeyboardAwareScrollView>
                            )
                        }}
                    </Formik>
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
    },
});

//make this component available to the app
export default Login;
