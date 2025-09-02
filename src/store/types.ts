export type City = {
  name: string;
  lat: number;
  lon: number;
};

type WeatherBasic = {
  name: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  wind: {
    speed: number;
    deg: number;
  };
  icon: string;
};

export type CurrentWeather = WeatherBasic;

export type Forecast = Partial<WeatherBasic> & {
  date: number;
  tempMin: number;
  tempMax: number;
  icon: string;
};
