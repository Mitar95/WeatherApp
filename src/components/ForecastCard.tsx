import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Forecast } from "../store/types";
import { format as formatDate } from "date-fns";
import { ConditionIcons } from "../features/weather/weatherUtils";

export default function ForecastCard({ item }: { item: Forecast }) {
  const date = formatDate(new Date(item.date), "EEE");
  const icon = item.conditionKey ? ConditionIcons[item.conditionKey] : "-";

  return (
    <View style={styles.card}>
      <Text>{date}</Text>
      <Text style={styles.icon}>{icon}</Text>

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
  icon: {
    fontSize: 32,
  },
});
