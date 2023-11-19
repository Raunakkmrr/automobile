import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
  filters: any;
  mainFile: any;
  selectedImage: any;
}

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    mainFile: {},
    selectedImage: {},
    filters: {
      window_refinement: {},
      bg_id: "",
    },
  } as FiltersState,
  reducers: {
    setWindowsFilter(
      state,
      action: PayloadAction<{ key: string; value: any } | null | undefined>
    ) {
      if (action.payload) {
        state.filters.window_refinement[action.payload.key] =
          action.payload.value;
      }
    },
    setBackgroundFilter(state, action: any) {
      state.filters.bg_id = action?.payload || "";
    },
    setNumberPlateFilter(state, action: any) {
      state.filters.number_plate = action.payload;
    },

    setMainFile(state, action: any) {
      state.mainFile = action.payload;
    },

    setSelectedImage(state, action: PayloadAction<any>) {
      state.selectedImage = action.payload;
    },
  },
});

export const filterActions = filterSlice.actions;
export { filterSlice };
