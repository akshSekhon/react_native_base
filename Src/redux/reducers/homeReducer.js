import {createSlice} from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'homeReducer',
  initialState: {
    favouriteCount: 0,
  },
  reducers: {
    saveFavouriteCount: (state, action) => {
      console.log('saveShowHomeTutorial action =>', action);
      state.favouriteCount = action?.payload;
      // setItem('favouriteCount', action?.payload);
    },

  },
});

export const {
  saveFavouriteCount,
} = homeSlice.actions;
export default homeSlice.reducer;
