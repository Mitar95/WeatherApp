import { format } from "date-fns";
import { Forecast } from "../../store/types";

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
