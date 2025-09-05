import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  addCityToRecent,
  clearRecent,
  clearSearch,
  fetchCities,
} from "../features/search/searchSlice";
import { AppDispatch, RootState } from "../store/store";
import { fetchWeather } from "../features/weather/weatherSlice";
import { City } from "../store/types";
import { getCurrentPosition } from "../features/geolocation/geolocation";
import { countryCodeToFlagEmoji } from "../utils/search.utils";
import { getContrastColor } from "../utils/colors.utils";

type SearchItem = City | { type: "location" | "clear" };

type Props = {
  backgroundColor: string;
};

export default function SearchBar({ backgroundColor }: Props) {
  const [inFocus, setInFocus] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { cities, recent, status } = useSelector(
    (state: RootState) => state.search
  );

  const textColor = getContrastColor(backgroundColor);
  const isLoading = status === "loading";
  const recentSearches: Array<SearchItem> = recent.length
    ? [...recent, { type: "clear" }]
    : [];
  const searchResults: Array<SearchItem> = cities?.length
    ? cities
    : [{ type: "location" }, ...recentSearches];

  const onSubmit = () => {
    const trimmed = query?.trim();
    if (trimmed) {
      dispatch(fetchCities(trimmed));
    } else {
      dispatch(clearSearch());
    }
  };

  useEffect(() => {
    if (!query || !query.trim()) return;
    const timeout = setTimeout(onSubmit, 500);
    return () => clearTimeout(timeout);
  }, [query, dispatch]);

  const resetSearch = () => {
    dispatch(clearSearch());
    Keyboard.dismiss();
    setQuery("");
  };

  const renderCityItem = ({ item }: { item: SearchItem }) => {
    const renderData = {
      icon: <></>,
      label: "",
      onPress: () => undefined,
    };

    switch (item.type) {
      case "city": {
        renderData.label = item.name;
        renderData.icon = (
          <Text style={styles.flag}>
            {countryCodeToFlagEmoji(item.countryCode)}
          </Text>
        );
        renderData.onPress = () => {
          dispatch(
            fetchWeather({
              lat: item.lat,
              lon: item.lon,
              city: item.name,
              country: item.countryName,
            })
          );
          dispatch(addCityToRecent(item));
          resetSearch();
        };
        break;
      }
      case "location": {
        renderData.label = "Current Location";
        renderData.icon = <Icon name="navigate" size={22} color="#3f7afaff" />;
        renderData.onPress = () => {
          resetSearch();
          getCurrentPosition().then(({ lat, lon }) => {
            dispatch(fetchWeather({ lat, lon }));
          });
        };
        break;
      }
      case "clear": {
        renderData.label = "Clear Resent Searches";
        renderData.icon = <Icon name="close" size={22} color="#3f7afaff" />;
        renderData.onPress = () => {
          Alert.alert("Clear Resent Searches?", "", [
            {
              style: "destructive",
              text: "Clear",
              onPress: () => {
                dispatch(clearRecent());
              },
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ]);
          resetSearch();
        };
        break;
      }
    }

    return (
      <TouchableOpacity onPress={renderData.onPress} style={styles.cityItem}>
        {renderData.icon}
        <Text style={[styles.cityText, { color: textColor }]}>
          {renderData.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={[{ backgroundColor }, styles.container]}>
        {isLoading ? (
          <ActivityIndicator size={20} color={textColor} />
        ) : (
          <Icon
            onPress={onSubmit}
            name={"search"}
            size={20}
            color={textColor}
          />
        )}
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder="Search city..."
          placeholderTextColor={textColor}
          value={query}
          onFocus={() => setInFocus(true)}
          onBlur={() => setInFocus(false)}
          onChangeText={setQuery}
          onSubmitEditing={onSubmit}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          data={inFocus ? searchResults : []}
          keyboardShouldPersistTaps={"handled"}
          keyExtractor={(_, index) => `${index}`}
          renderItem={renderCityItem}
          style={[styles.resultsList, { backgroundColor }]}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
  },
  resultsList: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    maxHeight: 250,
  },
  cityItem: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
    padding: 12,
  },
  cityText: {
    fontWeight: "600",
    fontSize: 16,
  },
  flag: {
    fontSize: 18,
  },
});
