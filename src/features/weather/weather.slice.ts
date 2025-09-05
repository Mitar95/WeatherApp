import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather, getForecast } from "./weather.api";
import { CurrentWeather, Forecast } from "../../store/types";
import { getDailyForecast, groupByDay } from "../../utils/weather.utils";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async ({
    lat,
    lon,
    city,
    country,
  }: {
    lat: number;
    lon: number;
    city?: string;
    country?: string;
  }) => {
    const { weather } = await getWeather(lat, lon, city, country);
    const { forecast } = await getForecast(lat, lon);
    const forecastByDay = groupByDay(forecast);
    const dailyForecast = getDailyForecast(forecastByDay);

    return { weather, forecast: dailyForecast };
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
