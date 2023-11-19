import { configureStore } from "@reduxjs/toolkit";

import { FiltersState, filterSlice } from "./filters-slice";
import { AssetState, assetSlice } from "./assets-slice";

export interface RootState {
  filters: FiltersState;
  assets: AssetState;
}

const store = configureStore({
  reducer: {
    filters: filterSlice.reducer,
    assets: assetSlice.reducer,
  },
});

export default store;
