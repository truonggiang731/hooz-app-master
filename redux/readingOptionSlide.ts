import {createSlice} from '@reduxjs/toolkit';
import {ColorScheme} from '@constants';

interface ReadingOptionState {
  color: string;
  backgroundColor: string;
  fontSize: number;
  fontWeight: "bold" | "normal" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
  textAlign: "justify" | "center" | "auto" | "left" | "right";
}

const initialState: ReadingOptionState = {
  color: ColorScheme.textColor,
  backgroundColor: ColorScheme.primaryColor,
  fontSize: 16,
  fontWeight: 'normal',
  textAlign: 'justify'
}

export const readingOption = createSlice({
  name: 'reaadingOption',
  initialState,
  reducers: {
    setReadingOption: (state, action) => {
      state.color = action.payload.color;
      state.backgroundColor = action.payload.backgroundColor;
      state.fontSize = action.payload.fontSize;
      state.fontWeight = action.payload.fontWeight;
      state.textAlign = action.payload.textAlign;
    },
    setDefaultReadingOption: (state) => {
      state.color = initialState.color;
      state.backgroundColor = initialState.backgroundColor;
      state.fontSize = initialState.fontSize;
      state.fontWeight = initialState.fontWeight;
      state.textAlign = initialState.textAlign;
    }
  }
});

export const {setReadingOption, setDefaultReadingOption} = readingOption.actions;

export default readingOption.reducer;
