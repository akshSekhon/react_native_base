//import liraries
import React, { Component, isValidElement, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import { moderateScale } from '../styles/responsiveSize';
import commonStyles from '../styles/commonStyles';
import ComponentStyles from '../styles/ComponentStyles';
import colors from '../styles/colors';
import ImagePath from '../Constants/ImagePath';
// create a component
const CustomTextInput = ({
  textStyle,
  containerStyle,
  innerContainerStyle,
  placeholder,
  value,
  maxLength,
  defaultSecure = false,
  onChangeText = () => { },
  leftImage, keyboardType,
  returnKeyType = 'done',
  imageEyeOpen = ImagePath.eyeOpen,
  imageEyeClose = ImagePath.eyeClose,
  isshowLeftImg = false,
  isTogleSecure = true,
  editable = true,
  isShowRightImage = false,
  rightImage,
  rightImageAction,
  rightText,
  rightTextStyle,
  leftText,
  leftTextStyle,
  onBlur = () => { },
  onFocus = () => { },
  secureTextEntry,
  hederText,
  headerTextStyle,
  helperText,
  errorText,
  helperTextStyle

}) => {


  const secure = secureTextEntry && defaultSecure === true

  const [secured, setSecured] = useState(secureTextEntry)

  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      {hederText &&
        <Text style={{ ...commonStyles.fontMedium16, color: colors.blackOpacity50, marginBottom: moderateScale(0), ...headerTextStyle }}> {hederText} </Text>
      }

      {/* <View> */}

      <View style={{ ...ComponentStyles.textfieldContainer, ...innerContainerStyle, }}>
        {isshowLeftImg &&
          <Image style={ComponentStyles.textInputImg} source={leftImage}></Image>
        }
        {(leftText) &&
          <View style={{ paddingLeft: moderateScale(8), marginBottom: 4 }}>
            <Text
              style={{ ...commonStyles.fontSize15, ...textStyle, ...leftTextStyle, textAlignVertical: 'top', }}>{leftText}</Text>
          </View>
        }
        {secureTextEntry ? <TextInput

          style={{ ...ComponentStyles.textInput, ...textStyle }} maxLength={maxLength}
          placeholder={placeholder} value={value}
          placeholderTextColor={colors.placeholder}
          returnKeyType={returnKeyType}
          secureTextEntry={secured}
          onChangeText={onChangeText}
          editable={editable}
          onFocus={onFocus}
          onBlur={onBlur}


        // selectTextOnFocus={true}
        /> : <TextInput

          style={{ ...ComponentStyles.textInput, ...textStyle, height: '100%' }} maxLength={maxLength}
          placeholder={placeholder} value={value}
          placeholderTextColor={colors.placeholder}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          secureTextEntry={secured}
          onChangeText={onChangeText}
          editable={editable}
          onFocus={onFocus}
          onBlur={onBlur}
        // selectTextOnFocus={true}
        />}

        {secureTextEntry === true &&
          <TouchableOpacity
          style={{marginEnd:-5,width:30,height:'75%',alignItems:'center',justifyContent:'center'}}
            onPress={() => {
              setSecured(!secured)
              console.log('secured=====', secured)
            }}


          >
            {isTogleSecure &&
              <Image
                style={{ ...ComponentStyles.textInputImg }}
                source={!secured ? imageEyeOpen : imageEyeClose} >
              </Image>
            }
          </TouchableOpacity>
        }
        {(rightText) &&
          <Text
            style={{
              ...commonStyles.fontSize15, flex: 0, textAlign: 'center', borderLeftWidth: 1.2,
              borderLeftColor: colors.black, textAlignVertical: 'center', paddingLeft: moderateScale(15),
              paddingRight: moderateScale(8), ...textStyle, ...rightTextStyle
            }}>{rightText}</Text>
        }
        {isShowRightImage &&
          <TouchableOpacity
            onPress={() => rightImageAction}
          >
            <Image
              style={{ ...ComponentStyles.textInputImg }}
              source={rightImage}
            >
            </Image>
          </TouchableOpacity>
        }

      </View>

      {/* 
      </View> */}
      {(errorText || helperText) &&

        <View style={{ marginTop: moderateScale(4) }}>
          {errorText &&
            <Text style={{ ...commonStyles.fontSize14, color: colors.red, ...helperTextStyle }}> {errorText} </Text>
          }

          {helperText &&
            <Text style={{ ...commonStyles.fontMedium14, color: colors.green, ...helperTextStyle }}> {helperText} </Text>
          }
        </View>
      }
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // marginHorizontal: 15,
  },
});

//make this component available to the app
export default CustomTextInput;
