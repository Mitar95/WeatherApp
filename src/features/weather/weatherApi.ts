import { Forecast, CurrentWeather } from "../../store/types";

const API_KEY = "936a67893d2bfcc305a5ab7b9137b83c";

export const getWeather = async (
  lat: number,
  lon: number,
  units: string = "metric"
): Promise<{ weather: CurrentWeather }> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  );

  const data = await response.json();

  const weather: CurrentWeather = {
    name: data.name,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    wind: {
      speed: data.wind.speed,
      deg: data.wind.deg,
    },
    icon: data.weather[0]?.icon,
  };

  return { weather };
};

export const getForecast = async (
  lat: number,
  lon: number,
  units: string = "metric",
  count: number = 5
): Promise<{ forecast: Array<Forecast> }> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&cnt=${count}&appid=${API_KEY}`
  );

  const data = await response.json();

  const forecast: Array<Forecast> = data.list.map((f) => {
    const date = new Date(f.dt * 1000).toLocaleDateString(undefined, {
      weekday: "short",
    });
    return {
      date: date,
      name: f.name,
      temperature: f.main.temp,
      feelsLike: f.main.feels_like,
      tempMin: f.main.temp_min,
      tempMax: f.main.temp_max,
      humidity: f.main.humidity,
      wind: {
        speed: f.wind.speed,
        deg: f.wind.deg,
      },
      icon: f.weather[0]?.icon,
    };
  });

  return { forecast };
};
