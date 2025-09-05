import React from "react";
import { LinearGradient } from "react-native-linear-gradient";
import { Keyboard, Pressable, StyleSheet } from "react-native";

type Props = {
  colors: Array<string>;
  children: React.ReactNode;
};

export default function WeatherBackground({ colors, children }: Props) {
  return (
    <LinearGradient colors={colors} style={StyleSheet.absoluteFill}>
      <Pressable style={StyleSheet.absoluteFill} onPress={Keyboard.dismiss}>
        {children}
      </Pressable>
    </LinearGradient>
  );
}
