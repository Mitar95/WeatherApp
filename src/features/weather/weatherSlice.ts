import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather, getForecast } from "./weatherApi";
import { CurrentWeather, Forecast } from "../../store/types";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async ({ lat, lon }: { lat: number; lon: number }) => {
    const { weather } = await getWeather(lat, lon);
    const { forecast } = await getForecast(lat, lon);

    return { weather, forecast };
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weather: null as CurrentWeather | null,
    forecast: [] as Forecast[],
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weather = action.payload.weather;
        state.forecast = action.payload.forecast;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default weatherSlice.reducer;
