import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  addCityToRecent,
  clearRecent,
  clearSearch,
  fetchCities,
} from "../features/search/searchSlice";
import { fetchWeather } from "../features/weather/weatherSlice";
import { City } from "../store/types";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { cities, recent } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    if (!query) return;

    const timeout = setTimeout(() => {
      dispatch(fetchCities(query));
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, dispatch]);

  const renderRecentItem = ({ item }: { item: City }) => {
    const onPress = () => {
      dispatch(fetchWeather({ lat: item.lat, lon: item.lon }));
    };

    return (
      <TouchableOpacity onPress={onPress} style={styles.recentItem}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderSearchItem = ({ item }: { item: City }) => {
    const onPress = () => {
      dispatch(fetchWeather({ lat: item.lat, lon: item.lon }));
      dispatch(addCityToRecent(item));
      dispatch(clearSearch());
      setQuery("");
    };

    return (
      <TouchableOpacity onPress={onPress} style={styles.searchItem}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const onClearPress = () => {
    Alert.alert("Clear Recent Searches?", "", [
      {
        text: "Clear",
        onPress: () => {
          dispatch(clearRecent());
        },
        style: "destructive",
      },
      {
        text: "Cancel",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Enter city..."
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
        <Button title="Search" onPress={() => dispatch(fetchCities(query))} />
      </View>

      {!!recent?.length && (
        <FlatList
          horizontal
          ListFooterComponent={<Button title="Clear" onPress={onClearPress} />}
          data={recent}
          renderItem={renderRecentItem}
        />
      )}

      {!!cities?.length && (
        <FlatList data={cities} renderItem={renderSearchItem} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  searchRow: { flexDirection: "row", margin: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    padding: 8,
    borderRadius: 5,
  },
  recentItem: {
    padding: 6,
    backgroundColor: "yellow",
  },
  searchItem: {
    padding: 16,
    backgroundColor: "azure",
  },
});
