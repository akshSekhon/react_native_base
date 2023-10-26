import { StyleSheet } from 'react-native';
import { moderateScale, moderateScaleVertical, scale, textScale } from './responsiveSize';
import colors from './colors';
import fontFamily from './fontFamily';
import { ImageEnum } from '../Constants';

export const hitSlopProp = {
    top: 12,
    right: 12,
    left: 12,
    bottom: 12
}
export default StyleSheet.create({
    container: {
        flex: 1
    },
    textfieldContainer: {
        // backgroundColor: colors.lightWhite,
         flexDirection: 'row',
        borderRadius: scale(10),
        borderColor: colors.borderGrayColor,
        borderWidth: scale(1.5),
        paddingHorizontal: moderateScale(10),
        // paddingVertical: moderateScale(0),
        height: moderateScale(54),
        // justifyContent: "center",
        alignItems: "center",
    },
    textInputImg: {
        borderRadius: 0, alignSelf: 'center',
        resizeMode: ImageEnum.contain,
        height: scale(20),
        width: scale(20)
    },
    textInput: {
        flex: 1,
        paddingHorizontal: moderateScale(8),
        color: colors.black,
        fontSize: textScale(16),
        fontFamily: fontFamily.regular,
        textAlignVertical: 'center'
    }, button: {
        borderRadius: 10,
        justifyContent: 'center', alignItems: 'center',
        overflow: 'hidden'
      },alertText: {
        fontSize: textScale(14),
        fontFamily: fontFamily.medium
      }
});
