export type City = {
  name: string;
  countryName: string;
  countryCode: string;
  lat: number;
  lon: number;
  type: "city";
};

type WeatherBasic = {
  name: string;
  country: string;
  countryCode: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  wind: {
    speed: number;
    deg: number;
  };
  conditionKey: ConditionKeys;
};

export type CurrentWeather = WeatherBasic;

export type Forecast = Partial<WeatherBasic> & {
  date: number;
  tempMin: number;
  tempMax: number;
  icon: string;
};

export enum ConditionKeys {
  Thunderstorm = "Thunderstorm",
  Drizzle = "Drizzle",
  Rain = "Rain",
  Snow = "Snow",
  Atmosphere = "Atmosphere",
  Clear = "Clear",
  FewClouds = "Few Clouds",
  Clouds = "Clouds",
  Unknown = "Unknown",
}
