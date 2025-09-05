import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { ConditionIcons } from "../utils/weather.utils";
import { countryCodeToFlagEmoji } from "../utils/search.utils";

type DetailsCard = {
  title: string;
  value: string;
  valueComponent?: React.ReactElement;
};

export default function CurrentWeather() {
  const { weather, status } = useSelector((state: RootState) => state.weather);

  if (!weather) return null;

  const isLoading = status === "loading";
  const icon = ConditionIcons[weather.conditionKey];

  const detailsData: Array<DetailsCard> = [
    { title: "Feels Like", value: `${Math.round(weather.feelsLike)}°C` },
    { title: "Humidity", value: `${weather.humidity}%` },
    {
      title: "Wind",
      value: `${Math.round(weather.wind.speed)}m/s`,
      valueComponent: (
        <Text
          style={[
            styles.details,
            {
              transform: [{ rotate: `${weather.wind.deg}deg` }],
            },
          ]}
        >
          {" ↓ "}
        </Text>
      ),
    },
  ];

  const detailsCard = ({ title, value, valueComponent }: DetailsCard) => {
    return (
      <View key={title} style={styles.detailsCard}>
        {isLoading ? (
          <ActivityIndicator size={24} />
        ) : (
          <>
            <Text style={styles.details}>{title}</Text>
            <View style={styles.detailsValue}>
              <Text style={styles.details}>{value}</Text>
              {valueComponent}
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{isLoading ? "..." : weather.name}</Text>
      <Text style={styles.country}>
        {isLoading
          ? "..."
          : `${weather.country} ${countryCodeToFlagEmoji(weather.countryCode)}`}
      </Text>
      <Text style={styles.temp}>
        {isLoading ? "..." : ` ${Math.round(weather.temperature)}°`}
      </Text>
      <Text style={styles.icon}>
        {isLoading ? " " : `${icon} ${icon} ${icon}`}
      </Text>
      <Text style={styles.condition}>
        {isLoading ? " " : `${weather.conditionKey}`}
      </Text>
      <View style={styles.detailsContainer}>
        {detailsData.map((d) => detailsCard(d))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  city: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  country: {
    textAlign: "center",
    fontSize: 16,
    color: "#eee",
    marginBottom: 16,
  },
  condition: {
    fontWeight: "600",
    marginTop: -16,
    fontSize: 16,
    color: "#fff",
    marginBottom: 16,
  },
  temp: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  detailsCard: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    height: 72,
    width: 84,
    rowGap: 2,
  },
  detailsContainer: {
    flexDirection: "row",
    width: "100%",
    columnGap: 12,
  },
  details: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  icon: {
    marginTop: -12,
    fontSize: 72,
    marginBottom: 12,
    letterSpacing: 4,
  },
  detailsValue: {
    flexDirection: "row",
  },
});
