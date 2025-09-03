import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { City } from "../store/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchWeather } from "../features/weather/weatherSlice";

export default function RecentSearches() {
  const { recent } = useSelector((state: RootState) => state.search);

  const dispatch = useDispatch<AppDispatch>();

  const onPress = (item: City) => {
    dispatch(fetchWeather({ lat: item.lat, lon: item.lon }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Recent Searches"}</Text>
      <ScrollView style={styles.list} horizontal>
        {recent.map((city, idx) => (
          <TouchableOpacity key={idx} onPress={() => onPress(city)}>
            <Text style={styles.city}>{city.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 12, marginHorizontal: 16 },
  title: { fontSize: 16, fontWeight: "600", color: "#fff", marginBottom: 8 },
  list: { flexDirection: "row", flexWrap: "wrap" },
  city: {
    color: "#fff",
    marginRight: 12,
    marginBottom: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
});
