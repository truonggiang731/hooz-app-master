import {configureStore} from '@reduxjs/toolkit'
import readingOptionSlide from './readingOptionSlide';
import sessionSlice from './sessionSlide';

const store = configureStore({
  reducer: {
    session: sessionSlice,
    readingOption: readingOptionSlide
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
