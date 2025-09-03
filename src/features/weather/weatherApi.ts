import { Forecast, CurrentWeather } from "../../store/types";
import { mapWeatherCodeToCondition } from "./weatherUtils";

const API_KEY = "936a67893d2bfcc305a5ab7b9137b83c";

export const getWeather = async (
  lat: number,
  lon: number,
  units: string = "metric"
): Promise<{ weather: CurrentWeather | null }> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  );

  const data = await response.json();

  console.log(data);

  if (!data) {
    return { weather: null };
  }

  const weather: CurrentWeather = {
    name: data.name,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    wind: {
      speed: data.wind.speed,
      deg: data.wind.deg,
    },
    conditionKey: mapWeatherCodeToCondition(data.weather[0]?.id),
  };

  return { weather };
};

export const getForecast = async (
  lat: number,
  lon: number,
  units: string = "metric"
): Promise<{ forecast: Array<Forecast> }> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  );

  const data = await response.json();

  if (!data?.list) {
    return {
      forecast: [],
    };
  }

  const forecast: Array<Forecast> =
    data.list.map((f) => {
      return {
        date: f.dt * 1000,
        name: f.name,
        tempMin: f.main.temp_min,
        tempMax: f.main.temp_max,
        conditionKey: mapWeatherCodeToCondition(f.weather[0]?.id),
      };
    }) ?? [];

  return { forecast };
};
