const API_KEY = "936a67893d2bfcc305a5ab7b9137b83c";

export const getCities = async (city: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
  );
  const data = await response.json();
  return data;
};
