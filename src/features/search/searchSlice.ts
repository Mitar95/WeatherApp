import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCities } from "./searchApi";
import { City } from "../../store/types";
import { Alert } from "react-native";

export const fetchCities = createAsyncThunk(
  "search/fetchCities",
  async (input: string) => {
    const res = await getCities(input);
    if (!res) {
      Alert.alert("City not found");
      return null;
    }

    const cities: Array<City> = res.map((c) => {
      return {
        name: c.name,
        lat: c.lat,
        lon: c.lon,
      };
    });
    return { cities };
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    cities: [] as Array<City>,
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
  },
  reducers: {},
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

export default searchSlice.reducer;
