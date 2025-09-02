import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCities } from "./searchApi";
import { City } from "../../store/types";
import { Alert } from "react-native";

export const fetchCities = createAsyncThunk(
  "search/fetchCities",
  async (input: string) => {
    const res = await getCities(input);
    if (!res?.features) {
      Alert.alert("City not found");
      return null;
    }

    const cities: Array<City> = res.features.map((c) => {
      return {
        name: c.properties.city,
        lat: c.properties.lat,
        lon: c.properties.lon,
      };
    });
    return { cities };
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    cities: [] as Array<City>,
    recent: [] as Array<City>,
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
  },
  reducers: {
    addCityToRecent: (state, action: PayloadAction<City>) => {
      const city = action.payload;
      const alreadyInRecent = state.recent.some(
        (r) => r.lat === city.lat && r.lon === city.lon
      );
      if (!alreadyInRecent) {
        state.recent.unshift(city);
      }
    },
    clearSearch: (state) => {
      state.cities = [];
    },
    clearRecent: (state) => {
      state.recent = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cities = action.payload?.cities ?? [];
      })
      .addCase(fetchCities.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addCityToRecent, clearSearch, clearRecent } =
  searchSlice.actions;
export default searchSlice.reducer;
