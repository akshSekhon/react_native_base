// import {clearUserData, setUserData} from '../../utils/utils';
import { Alert } from 'react-native';
import { AlertType } from '../../Constants/Enums';
import { pushTo, showAlertMessage } from '../../HelperFiles/HelperFunction';
import { Apis } from '../../Services/Apis';
import { clearUserData, setUserData } from '../../Services/AsyncStorage';
import { apiGet, apiPost } from '../../Services/NetworkServices';
import {
  saveFcmToken,
  saveIntro,
  saveLocation,
  saveLoginData,
  saveLoginPin,
  saveUserData,
} from '../reducers/auth';
import store from '../store';

const {dispatch} = store;

export function saveUserDataToReux(data) {
  dispatch(saveUserData(data));
}

export function saveShowIntro(data) {
  dispatch(saveIntro(data));
}

export const saveFcmTokenToRedux = (data) => {
  dispatch(saveFcmToken(data));
};

export function saveLocationData(data) {
  dispatch(saveLocation(data));
}

export const saveLoginPinToStore = (data) => {
  dispatch(saveLoginPin(data));
};

export const saveProfileSetupDoneToStore = (data) => {
  dispatch(saveLoginData(data));
};

// export const signUp = (data) => {
//   return new Promise(resolve => {
//     setUserData(data).then(suc => {
//       dispatch(saveUserData(data));
//       resolve(data);
//     });
//   });
// };
export const userSignup = (data) => {
  console.log(data, 'The action Data');
  return new Promise(async (resolve, reject) => {
  apiPost(Apis.signUp, data, {}).then((res) => {
    const data = res?.data
    let msg = res?.message
    showAlertMessage(msg,AlertType.success)
    resolve(res)
  }).catch((error) => {
    console.log('userSignup userSignup error: ---', error);
    console.log("catch error in login is :---- ", error);
    setLoading(false);
    showAlertMessage(error?.error, AlertType.danger)
    reject(error)
  })
})
};

export const userSignupOtpVerify = (data) => {
  console.log(data, 'The action Data');
  return new Promise(async (resolve, reject) => {
  apiPost(Apis.verifyOtp_Signup, data, {}).then((res) => {
    console.log('userSignup userSignupOtpVerify res: ---', res);

    const data = res?.data
    let msg = res?.message
    setUserDataToLocal(res?.data)
    Alert.alert('userMove to home screen')
    showAlertMessage(msg,AlertType.success)
    resolve(res)
  }).catch((error) => {
    console.log('userSignup userSignupOtpVerify error: ---', error);
    showAlertMessage(error?.error, AlertType.danger)
    reject(error)
  })
})
};
export const userOtpVerify = (data) => {
  console.log(data, 'The action Data');
  return new Promise(async (resolve, reject) => {
  apiPost(Apis.verifyOtp, data, {}).then((res) => {
    console.log('userSignup userOtpVerify res: ---', res);

    const data = res?.data
    let msg = res?.message
    Alert.alert('userMove to login screen')
    showAlertMessage(msg,AlertType.success)
    resolve(res)
  }).catch((error) => {
    console.log('userSignup userOtpVerify error: ---', error);
    showAlertMessage(error?.error, AlertType.danger)
    reject(error)
  })
})
};

export const userResendOtp = (data) => {
  console.log(data, 'The action Data');
  return new Promise(async (resolve, reject) => {
  apiPost(Apis.resendotp, data, {}).then((res) => {
    console.log('userSignup userResendOtp res: ---', res);

    const data = res?.data
    let msg = res?.message
    showAlertMessage(msg,AlertType.success)
    resolve(res)
  }).catch((error) => {
    console.log('userSignup userResendOtp error: ---', error);
    showAlertMessage(error?.error, AlertType.danger)
    reject(error)
  })
})
};
export const userForgotPassword = (data) => {
  console.log(data, 'The action Data');
  return new Promise(async (resolve, reject) => {
  apiPost(Apis.forgotPassword, data, {}).then((res) => {
    console.log('userSignup forgotPasswordRequest res: ---', res);

    const data = res?.data
    let msg = res?.message
    showAlertMessage(msg,AlertType.success)
    resolve(res)
  }).catch((error) => {
    console.log('userSignup forgotPasswordRequest error: ---', error);
    showAlertMessage(error?.error, AlertType.danger)
    reject(error)
  })
})
};
export const userCreteNewPassword = (data,header) => {
  console.log(data, 'The action Data');
  return new Promise(async (resolve, reject) => {
  apiPost(Apis.resetPassword, data, header).then((res) => {
    console.log(' userCreteNewPassword res: ---', res);

    const data = res?.data
    let msg = res?.message
    showAlertMessage(msg,AlertType.success)
    resolve(res)
  }).catch((error) => {
    console.log(' userCreteNewPassword error: ---', error);
    showAlertMessage(error?.error, AlertType.danger)
    reject(error)
  })
})
};
export const userLogin = (data) => {
  console.log(data, 'The action Data');
  return new Promise(async (resolve, reject) => {
  apiPost(Apis.login, data, {}).then((res) => {
    setUserDataToLocal(res?.data)
    let msg = res?.message
    showAlertMessage(msg,AlertType.success)
    resolve(res)
  }).catch((error) => {
    showAlertMessage(error?.error, AlertType.danger)
    reject(error)
  })
})
};
export const userLogout = (userId) => {
  console.log(userId, 'The userLogout action Data');
  if (!userId){
    showAlertMessage('UserId not found')
    return
  }
  const qwery = `?userId=${userId}`
  return new Promise(async (resolve, reject) => {
  apiGet(Apis.logOut+qwery, {}, {}).then((res) => {
    clearLoginData()
    let msg = res?.message
    showAlertMessage(msg,AlertType.success)
    resolve(res)
  }).catch((error) => {
    showAlertMessage(error?.error, AlertType.danger)
    reject(error)
  })
})
};
export const setUserDataToLocal = (data) => {
  return new Promise((resolve, reject) => {
    setUserData(data)
      .then(suc => {
        console.log('suc while setUserDataToLocal :---',suc);

        dispatch(saveUserData(data));
        resolve(data);
      })
      .catch(error => { 
        console.log('error while setUserDataToLocal :---',error);
        showAlertMessage(error?.error, AlertType.danger)
        reject(error);
      });
  });
};

export const clearLoginData = ()=> {
  dispatch(saveUserData({}));
  clearUserData();
}
