import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPopap: false,
  currentMusic: {},
  searchText: "",
  isSerachPanelActive: false,
  uploadMusicPopap: false,
  uploadMusic: {},
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setPopap: (state, action) => {
      state.currentPopap = action.payload;
    },
    setCurrentMusic: (state, action) => {
      state.currentMusic = action.payload;
    },
    setSearchInputText: (state, action) => {
      state.searchText = action.payload;
    },
    setSearchPanelActive: (state, action) => {
      state.isSerachPanelActive = action.payload;
    },
    setUploadMusicPopap: (state, action) => {
      state.uploadMusicPopap = action.payload;
    },
    setUploadMusic: (state, action) => {
      state.uploadMusic = action.payload;
    },
  },
});

export const {
  setPopap,
  setCurrentMusic,
  setSearchInputText,
  setSearchPanelActive,
  setUploadMusicPopap,
  setUploadMusic,
} = commonSlice.actions;
export default commonSlice.reducer;
