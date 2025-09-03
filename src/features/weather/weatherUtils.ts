import { format } from "date-fns";
import { ConditionKeys, Forecast } from "../../store/types";

export const groupByDay = (data: Array<Forecast>, excludeToday = true) => {
  const grouped = data.reduce(
    (acc: Record<string, Array<Forecast>>, item: Forecast) => {
      const today = format(new Date(), "yyyy-MM-dd");
      const date = format(new Date(item.date), "yyyy-MM-dd");

      if (excludeToday && date === today) {
        return acc;
      }

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    },
    {}
  );

  return grouped;
};

export const getDailyForecast = (
  data: Record<string, Array<Forecast>>
): Array<Forecast> => {
  const dailyForecast = Object.keys(data).map((date) => {
    const entries = data[date];

    const minTemp = Math.min(...entries.map((e) => e.tempMin));
    const maxTemp = Math.max(...entries.map((e) => e.tempMax));

    const middayIndex = Math.floor(entries.length / 2);
    const midday = entries[Math.max(0, middayIndex)];

    const forecast: Forecast = {
      ...midday,
      tempMin: minTemp,
      tempMax: maxTemp,
    };

    return forecast;
  });

  return dailyForecast;
};

export const weatherBackgrounds: Record<ConditionKeys, string[]> = {
  Thunderstorm: ["#373B44", "#4286f4"], // dark stormy blue
  Drizzle: ["#89F7FE", "#66A6FF"], // light aqua blue
  Rain: ["#00C6FB", "#005BEA"], // deep blue
  Snow: ["#E0EAFC", "#CFDEF3"], // icy white-blue
  Atmosphere: ["#757F9A", "#D7DDE8"], // misty gray
  Clear: ["#56CCF2", "#2F80ED"], // sunny blue sky
  Clouds: ["#757F9A", "#D7DDE8"], // cloudy gray
  Unknown: ["#bdc3c7", "#2c3e50"], // fallback gradient
};

export const ConditionIcons: Record<ConditionKeys, string> = {
  [ConditionKeys.Thunderstorm]: "⛈️",
  [ConditionKeys.Drizzle]: "🌦️",
  [ConditionKeys.Rain]: "🌧️",
  [ConditionKeys.Snow]: "❄️",
  [ConditionKeys.Atmosphere]: "🌫️",
  [ConditionKeys.Clear]: "☀️",
  [ConditionKeys.Clouds]: "☁️",
  [ConditionKeys.Unknown]: "❓",
};

export function mapWeatherCodeToCondition(code: number): ConditionKeys {
  if (code >= 200 && code < 300) return ConditionKeys.Thunderstorm;
  if (code >= 300 && code < 400) return ConditionKeys.Drizzle;
  if (code >= 500 && code < 600) return ConditionKeys.Rain;
  if (code >= 600 && code < 700) return ConditionKeys.Snow;
  if (code >= 700 && code < 800) return ConditionKeys.Atmosphere;
  if (code === 800) return ConditionKeys.Clear;
  if (code > 800 && code < 900) return ConditionKeys.Clouds;
  return ConditionKeys.Unknown;
}
