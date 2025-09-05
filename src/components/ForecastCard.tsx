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
    const description = `L: ${Math.round(item.tempMin)}° H: ${Math.round(
      item.tempMax
    )}°\n${icon}\nHumidity: ${item.humidity}%\nWind: ${item.wind?.speed} m/s`;
    Alert.alert(title, description);
  };

  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={styles.card}
    >
      {isLoading ? (
        <ActivityIndicator size={32} />
      ) : (
        <>
          <Text>{date}</Text>
          <Text style={styles.icon}>{icon}</Text>
          <Text>
            {`${Math.round(item.tempMin)}° / ${Math.round(item.tempMax)}°`}
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
    backgroundColor: "azure",
    borderRadius: 10,
    height: 90,
    maxWidth: 70,
  },
  icon: {
    fontSize: 32,
  },
});
