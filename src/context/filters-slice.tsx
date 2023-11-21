import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
  filters: any;
  mainFile: any;
  selectedImage: any;
  backgroundName: string;
  plateName: string;
  sampleSelectedImage: any;
  selectedFile: any;
}

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    mainFile: {},
    backgroundName: "",
    plateName: "",
    selectedImage: {},
    sampleSelectedImage: "",
    selectedFile: "",
    filters: {
      window_refinement: {
        TINT_COLOR: "(166, 205, 203)",
        TONE_ON_TONE: "False",
        ADD_GLARE: "False",
        TRANSPARENCY: 0,
      },
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

    setMainFile(state, action: PayloadAction<any>) {
      state.mainFile = action.payload;
    },

    setSelectedImage(state, action: PayloadAction<any>) {
      state.selectedImage = action.payload;
    },

    setBackgroundName(state, action: any) {
      state.backgroundName = action.payload;
    },
    setPlateName(state, action: any) {
      state.plateName = action.payload;
    },
    setSelectedSampleImage(state, action: any) {
      state.sampleSelectedImage = action.payload;
    },

    setSelectedFile(state, action: PayloadAction<any>) {
      state.selectedFile = action.payload;
    },

    removeAllFilter(state) {
      state.filters = {
        window_refinement: {
          TINT_COLOR: "(166, 205, 203)",
          TONE_ON_TONE: "False",
          ADD_GLARE: "False",
          TRANSPARENCY: 0,
        },
        bg_id: "",
      };
      state.backgroundName = "";
      state.plateName = "";
      state.sampleSelectedImage = "";
    },
  },
});

export const filterActions = filterSlice.actions;
export { filterSlice };
