const API_KEY = "6df0485e8fc946dab8e72951df653e9e";

export const getCities = async (city: string) => {
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${city}&type=city&limit=5&apiKey=${API_KEY}`
  );
  const data = await response.json();
  return data;
};
