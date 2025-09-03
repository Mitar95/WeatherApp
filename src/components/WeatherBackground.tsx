import React from "react";
import { LinearGradient } from "react-native-linear-gradient";
import { StyleSheet } from "react-native";
import { ConditionKeys } from "../store/types";
import { weatherBackgrounds } from "../features/weather/weatherUtils";

type Props = {
  condition?: ConditionKeys;
  children: React.ReactNode;
};

export default function WeatherBackground({ condition, children }: Props) {
  const defaultLoadingBackground = ["#89f7fe", "#66a6ff"];

  const colors = condition
    ? weatherBackgrounds[condition]
    : defaultLoadingBackground;

  return (
    <LinearGradient angle={14} colors={colors} style={StyleSheet.absoluteFill}>
      {children}
    </LinearGradient>
  );
}
