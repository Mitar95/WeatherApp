import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store/store";
import WeatherScreen from "./src/screens/WeatherScreen";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <SafeAreaProvider style={styles.safeArea}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <WeatherScreen />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
