import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weather/weatherSlice";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
