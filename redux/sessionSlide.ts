import {createSlice} from '@reduxjs/toolkit';
import {Tokens} from '../services/Types';

interface SessionState {
  tokens: null | Tokens;
  isRefreshing: boolean;
}

const initialState: SessionState = {
  tokens: null,
  isRefreshing: false
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.tokens = action.payload;
    },
    setIsRefreshing: (state, action) => {
      state.isRefreshing = action.payload;
    }
  }
})

export const { setTokens, setIsRefreshing } = sessionSlice.actions;

export default sessionSlice.reducer
