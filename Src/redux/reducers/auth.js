import {createSlice} from '@reduxjs/toolkit';
import { setUserData } from '../../Services/AsyncStorage';
// import {setIntroData, setUserData} from '../../utils/utils';

const authSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: {},
    showIntro: true,
    saveLocation: null,
    fcmToken: null,
    loginData: false,
    loginPin: null,
    filter: {},
  },
  reducers: {
    saveFcmToken: (state, action) => {
      console.log('saveUserData action =>', action?.payload);
      state.fcmToken = action.payload;
    },
    saveUserData: (state, action) => {
      console.log('data in reducer', action);
      state.userData = action.payload;
      setUserData(state?.userData);
    },
    saveIntro: (state, action) => {
      state.showIntro = action.payload;
      // setIntroData(state?.showIntro);
    },
    saveLocation: (state, action) => {
      state.saveLocation = action.payload;
    },
    saveLoginData: (state, action) => {
      state.loginData = action.payload;
    },
    saveLoginPin: (state, action) => {
      console.log('saveLoginPin action =>', action?.payload);
      state.loginPin = action.payload;
    },
  },
});

export const {
  saveFcmToken,
  saveUserData,
  saveIntro,
  saveLocation,
  saveLoginData,
  saveLoginPin,
} = authSlice.actions;

export default authSlice.reducer;
