import { StyleSheet, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ForecastCard from "./ForecastCard";

const Forecast = () => {
  const { forecast, status } = useSelector((state: RootState) => state.weather);

  const isLoading = status === "loading";

  return (
    <View style={styles.container}>
      {forecast.map((f, index) => (
        <ForecastCard
          key={`${index}-${f.date}`}
          item={f}
          isLoading={isLoading}
        />
      ))}
    </View>
  );
};

export default Forecast;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
