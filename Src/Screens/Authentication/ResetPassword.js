
//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Components from '../../Components/CompoIndex'
import En from '../../Constants/En';
import { Formik } from 'formik';
import { changePasswordValidationSchema, signUpValidationSchema } from '../../HelperFiles/validations';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScaleVertical } from '../../styles/responsiveSize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import commonStyles from '../../styles/commonStyles';
import colors from '../../styles/colors';
import { Navigations } from '../../Constants';
import actions from '../../redux/actions';
import { pushTo } from '../../HelperFiles/HelperFunction';
const ResetPassword = ({ navigation,route }) => {
    const lastScreenData = route?.params
    const [bottomMargin, setbottomMargin] = useState(0)

    const _onSubmitFormData = async (data) => {
        const { newPassword } = data
        let registerPayload = {
            new_password: newPassword,
            
        }
        setNewPasswordRequest(registerPayload)
       
    }
    const setNewPasswordRequest = async (data) => {
        const header = {Authorization:lastScreenData?.token ?? '' }
        actions.userCreteNewPassword(data,header).then((res) => {
          console.log('usersResendOtp res : --',res);
          pushTo(Navigations.Login)
        }).catch((error) => {
            console.log('usersResendOtp error: ---', error);
          })
    }

    return (
        <Components.WrapperContainer>
            <Components.AuthWrapper
              screenName={Navigations.ResetPassword}
            >
                <View>
                    <Formik
                        validationSchema={changePasswordValidationSchema}
                        initialValues={{
                            //  oldPassword: '',
                             newPassword: '', confimPass: '',
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
                                            hederText={En.New_Password}
                                            onChangeText={handleChange('newPassword')}
                                            onBlur={handleBlur('newPassword')}
                                            value={values?.newPassword}
                                            placeholder={"********"}
                                            errorText={(errors?.newPassword && touched?.newPassword) && errors?.newPassword}
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
                                                title={En.Reset_Password}
                                                isdisable={!isValid}
                                                onPress={handleSubmit}
                                            />

                                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                <Text style={commonStyles.fontMedium14}>{En.Already_have_an_account} <Text onPress={() => navigation.navigate(Navigations.Login)} style={{ ...commonStyles.fontSemiBold14, color: colors.theme }} >{En.LogIn_here} </Text></Text>

                                            </View> */}

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
export default ResetPassword;
