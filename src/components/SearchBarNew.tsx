import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  addCityToRecent,
  clearSearch,
  fetchCities,
} from "../features/search/searchSlice";
import { AppDispatch, RootState } from "../store/store";
import { fetchWeather } from "../features/weather/weatherSlice";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { cities } = useSelector((state: RootState) => state.search);

  const onSubmit = () => {
    const trimmed = query?.trim();
    if (trimmed) {
      dispatch(fetchCities(trimmed));
    }
  };

  useEffect(() => {
    if (!query || !query.trim()) return;
    const timeout = setTimeout(onSubmit, 500);
    return () => clearTimeout(timeout);
  }, [query, dispatch]);

  const renderCityItem = ({ item }: any) => {
    const onPress = () => {
      dispatch(fetchWeather({ lat: item.lat, lon: item.lon }));
      dispatch(addCityToRecent(item));
      dispatch(clearSearch());
      setQuery("");
    };

    return (
      <TouchableOpacity onPress={onPress} style={styles.cityItem}>
        <Icon name="location-outline" size={18} color="#333" />
        <Text style={styles.cityText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <Icon name="search" size={20} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Search city..."
          placeholderTextColor="#ccc"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={onSubmit}
        />
      </View>

      {!!cities?.length && (
        <FlatList
          data={cities}
          keyExtractor={(item, index) => `${item.lat}-${item.lon}-${index}`}
          renderItem={renderCityItem}
          style={styles.resultsList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    padding: 8,
    alignItems: "center",
    marginHorizontal: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: "#fff",
  },
  resultsList: {
    marginTop: 8,
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 8,
    maxHeight: 200, // prevent infinite scroll area
  },
  cityItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cityText: {
    marginLeft: 8,
    color: "#333",
  },
});
