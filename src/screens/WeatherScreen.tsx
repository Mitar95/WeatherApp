import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import CurrentWeatherCard from "../components/CurrentWeatherCard";
import ForecastCard from "../components/ForecastCard";
import { AppDispatch, RootState } from "../store/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getCurrentPosition } from "../features/geolocation/geolocation";
import { fetchWeather } from "../features/weather/weatherSlice";

export default function WeatherScreen() {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.search);
  const { forecast } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    (async () => {
      try {
        const { lat, lon } = await getCurrentPosition();
        dispatch(fetchWeather({ lat, lon }));
      } catch {
        // fallback: ask user to search manually
      }
    })();
  }, []);

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <SearchBar />
      {status === "loading" && <Text>{"Loading..."}</Text>}
      <CurrentWeatherCard />
      <FlatList
        horizontal
        data={forecast}
        renderItem={({ item }) => <ForecastCard item={item} />}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}
