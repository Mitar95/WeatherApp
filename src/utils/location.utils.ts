import Geolocation from "@react-native-community/geolocation";

export const getCurrentPosition = () => {
  return new Promise<{ lat: number; lon: number }>((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};
