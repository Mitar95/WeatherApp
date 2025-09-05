import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Forecast } from "../store/types";
import { format as formatDate } from "date-fns";
import { ConditionIcons } from "../utils/weather.utils";

type Props = {
  item: Forecast;
  isLoading: boolean;
};

export default function ForecastCard({ item, isLoading }: Props) {
  const date = formatDate(new Date(item.date), "EEE");
  const icon = item.conditionKey ? ConditionIcons[item.conditionKey] : "-";

  const onPress = () => {
    const title = formatDate(new Date(item.date), "EEEE, dd MMMM");
    const description = `H: ${Math.round(item.tempMax)}° L: ${Math.round(
      item.tempMin
    )}°\n${icon}\nHumidity: ${item.humidity}%\nWind: ${Math.round(
      item.wind?.speed ?? 0
    )}m/s`;
    Alert.alert(title, description);
  };

  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={styles.card}
    >
      {isLoading ? (
        <ActivityIndicator color={"#fff"} size={32} />
      ) : (
        <>
          <Text style={styles.text}>{date}</Text>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.textBold}>
            {`${Math.round(item.tempMax)}° / ${Math.round(item.tempMin)}°`}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    height: 90,
    maxWidth: 70,
  },
  text: {
    color: "#fff",
  },
  textBold: {
    color: "#fff",
    fontWeight: "600",
  },
  icon: {
    fontSize: 32,
  },
});
