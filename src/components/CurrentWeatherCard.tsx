import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function CurrentWeatherCard() {
  const weather = useSelector((state: RootState) => state.weather.weather);

  if (!weather) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{weather.name}</Text>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
        }}
        style={{ width: 60, height: 60 }}
      />
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
});
