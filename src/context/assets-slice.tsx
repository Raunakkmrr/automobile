import { createSlice } from "@reduxjs/toolkit";

export interface AssetState {
  assets: {
    backgrounds: any[];
    number_plates: any[];
    sample_images: any[];
  };
}

const assetSlice = createSlice({
  name: "assets",
  initialState: {
    assets: {
      backgrounds: [],
      number_plates: [],
      sample_images: [],
    },
  } as AssetState,
  reducers: {
    setAssets(state, action: any) {
      state.assets = action.payload;
    },
  },
});

export const assetActions = assetSlice.actions;
export { assetSlice };
