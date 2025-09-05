import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import CurrentWeatherCard from "../components/CurrentWeatherCard";
import { AppDispatch, RootState } from "../store/store";
import { getCurrentPosition } from "../utils/location.utils";
import { fetchWeather } from "../features/weather/weather.slice";
import WeatherBackground from "../components/WeatherBackground";
import Forecast from "../components/Forecast";
import AppSafeArea from "../components/AppSafeArea";
import { weatherBackgrounds } from "../utils/weather.utils";
import { lightenHexColor } from "../utils/colors.utils";

export default function WeatherScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { weather } = useSelector((state: RootState) => state.weather);

  const bgColors = weather?.conditionKey
    ? weatherBackgrounds[weather.conditionKey]
    : ["#89f7fe", "#66a6ff"];

  const init = () => {
    getCurrentPosition().then(({ lat, lon }) => {
      dispatch(fetchWeather({ lat, lon }));
    });
  };

  useEffect(init, []);

  return (
    <WeatherBackground colors={bgColors}>
      <AppSafeArea style={styles.container}>
        <View style={styles.main}>
          <CurrentWeatherCard />
          <Forecast />
        </View>
        <SearchBar backgroundColor={lightenHexColor(bgColors[0])} />
      </AppSafeArea>
    </WeatherBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    justifyContent: "space-between",
  },
  main: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 32,
  },
});
