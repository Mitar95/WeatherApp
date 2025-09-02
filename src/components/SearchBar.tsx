import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchCities } from "../features/search/searchSlice";
import { fetchWeather } from "../features/weather/weatherSlice";
import { City } from "../store/types";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const cities = useSelector((state: RootState) => state.search.cities);

  const renderSearchItem = ({ item }: { item: City }) => {
    const onPress = () => {
      dispatch(fetchWeather({ lat: item.lat, lon: item.lon }));
    };

    return (
      <TouchableOpacity onPress={onPress} style={styles.searchItem}>
        <Text>
          {item.name} {item.lat} {item.lon}
        </Text>
      </TouchableOpacity>
    );
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

      {cities?.length && (
        <FlatList data={cities} renderItem={renderSearchItem} />
      )}
      {/* <Text style={{ fontSize: 6 }}>{JSON.stringify(cities, null, 1)}</Text> */}
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
  searchItem: {
    padding: 16,
    backgroundColor: "azure",
  },
});
