import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ConditionIcons } from "../features/weather/weatherUtils";

export default function CurrentWeatherCard() {
  const weather = useSelector((state: RootState) => state.weather.weather);

  if (!weather) return null;

  const icon = ConditionIcons[weather.conditionKey];

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.temp}>{Math.round(weather.temperature)}°C</Text>
      <Text>
        {"Feels like:"} {Math.round(weather.feelsLike)}°C
      </Text>
      <Text>Humidity: {weather.humidity}%</Text>
      <Text>Wind: {weather.wind.speed} m/s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, alignItems: "center" },
  city: { fontSize: 22, fontWeight: "bold" },
  temp: { fontSize: 40 },
  icon: { fontSize: 64 },
});
