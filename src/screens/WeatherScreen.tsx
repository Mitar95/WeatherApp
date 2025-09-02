import React from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import CurrentWeatherCard from "../components/CurrentWeatherCard";
import ForecastCard from "../components/ForecastCard";
import { RootState } from "../store/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WeatherScreen() {
  const insets = useSafeAreaInsets();

  const { status } = useSelector((state: RootState) => state.search);
  const { forecast } = useSelector((state: RootState) => state.weather);

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
        data={forecast?.slice(0, 5)}
        renderItem={({ item }) => <ForecastCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
