import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import WeatherScreen from "./src/screens/WeatherScreen";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider style={styles.safeArea}>
      <Provider store={store}>
        <WeatherScreen />
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // optional, keeps background consistent
  },
});
