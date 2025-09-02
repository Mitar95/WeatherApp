import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Forecast } from "../store/types";
import { format as formatDate } from "date-fns";

export default function ForecastCard({ item }: { item: Forecast }) {
  const date = formatDate(new Date(item.date), "EEE");

  return (
    <View style={styles.card}>
      <Text>{date}</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${item.icon}.png` }}
        style={{ width: 40, height: 40 }}
      />
      <Text>
        {Math.round(item.tempMin)}° / {Math.round(item.tempMax)}°
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    padding: 10,
    margin: 5,
    backgroundColor: "azure",
    borderRadius: 10,
  },
});
