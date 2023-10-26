
//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Components from '../../Components/CompoIndex'
import En from '../../Constants/En';
import { Formik } from 'formik';
import { signUpValidationSchema } from '../../HelperFiles/validations';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScaleVertical } from '../../styles/responsiveSize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import commonStyles from '../../styles/commonStyles';
import colors from '../../styles/colors';
import { Navigations } from '../../Constants';
import actions from '../../redux/actions';
import { pushTo, showAlertMessage } from '../../HelperFiles/HelperFunction';
import { useSelector } from 'react-redux';
import { AlertType } from '../../Constants/Enums';
const SignUp = ({ navigation }) => {
    const [bottomMargin, setbottomMargin] = useState(0)
    const fcmToken = useSelector(state => state?.auth?.fcmToken)
    const apiLoading = useSelector((state)=> state?.appReducerData?.appLoading)
    const _onSubmitFormData = async (data) => {
        const { name, email, password } = data
        let registerPayload = {
            name: name,
            email: email,
            password: password,
            deviceToken: fcmToken ?? '123456',
        }
        await userSignUp(registerPayload)
        // showAlertMessage('user sign up sucessfull')
    }

    const userSignUp = async (data) => {
        actions.userSignup(data).then((res) => {
          console.log('Components.WrapperContainer res : --',res);
          const payload = {...res?.data,lastScreen:Navigations.SignUp}
           pushTo(Navigations.OtpVerification,payload)
        }).catch((error) => {
            console.log('Components.WrapperContainer error: ---', error);
            reject(error)
          })
    }


    return (
        <Components.WrapperContainer>
            <Components.AuthWrapper
                screenName={Navigations.SignUp}
            >
                <View >
                    <Formik
                        validationSchema={signUpValidationSchema}
                        initialValues={{
                            name: 'aksh',
                            email: 'aksh@yopmail.com',
                            password: 'Qwerty@123', confimPass: 'Qwerty@123',
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
                                            hederText={En.Name}
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            value={values?.name}
                                            placeholder={En.Name}
                                            errorText={(errors?.name && touched?.name) && errors?.name}
                                        />

                                        <Components.CustomTextInput
                                            hederText={En.Email}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values?.email}
                                            placeholder={En.Email}
                                            errorText={(errors?.email && touched?.email) && errors?.email}
                                        />


                                        <Components.CustomTextInput
                                            hederText={En.Password}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            value={values?.password}
                                            placeholder={"********"}
                                            errorText={(errors?.password && touched?.password) && errors?.password}
                                            secureTextEntry={true}
                                        />


                                        <Components.CustomTextInput
                                            hederText={En.Confirm_Password}
                                            onChangeText={handleChange('confimPass')}
                                            onBlur={handleBlur('confimPass')}
                                            value={values?.confimPass}
                                            placeholder={"********"}
                                            errorText={(errors?.confimPass && touched?.confimPass) && errors?.confimPass}
                                            secureTextEntry={true}
                                        />
                                        <View style={{ gap: moderateScaleVertical(8), marginTop: moderateScaleVertical(15) }}>

                                            <Components.CustomButton
                                                containerStyle={{}}
                                                title={En.Register}
                                                isdisable={!isValid}
                                                // isloading={apiLoading}
                                                onPress={handleSubmit}
                                            // onDisablePress={()=>actions.setIsApploading(true)}
                                            />

                                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                <Text style={commonStyles.fontMedium14}>{En.Already_have_an_account} <Text onPress={() => navigation.navigate(Navigations.Login)} style={{ ...commonStyles.fontSemiBold14, color: colors.theme }} >{En.LogIn_here} </Text></Text>

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
export default SignUp;
