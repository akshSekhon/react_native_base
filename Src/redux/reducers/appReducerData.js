import {createSlice} from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'appReducerData',
  initialState: {
   appLoading: false,
  },
  reducers: {
    isAppLoading: (state, action) => {
      console.log('saveShowHomeTutorial action =>', action);
      state.appLoading = action?.payload;
      // setItem('favouriteCount', action?.payload);
    },

  },
});

export const {
    isAppLoading,
} = appSlice.actions;
export default appSlice.reducer;
