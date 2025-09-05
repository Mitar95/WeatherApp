import { ConditionKeys } from "../store/types";
import { mapWeatherCodeToCondition } from "./weather.utils";

describe("mapWeatherCodeToCondition", () => {
  it("maps thunderstorm codes", () => {
    expect(mapWeatherCodeToCondition(201)).toBe(ConditionKeys.Thunderstorm);
  });

  it("maps drizzle codes", () => {
    expect(mapWeatherCodeToCondition(301)).toBe(ConditionKeys.Drizzle);
  });

  it("maps rain codes", () => {
    expect(mapWeatherCodeToCondition(511)).toBe(ConditionKeys.Rain);
  });

  it("maps snow codes", () => {
    expect(mapWeatherCodeToCondition(615)).toBe(ConditionKeys.Snow);
  });

  it("maps atmosphere codes", () => {
    expect(mapWeatherCodeToCondition(741)).toBe(ConditionKeys.Atmosphere);
  });

  it("maps clear sky code", () => {
    expect(mapWeatherCodeToCondition(800)).toBe(ConditionKeys.Clear);
  });

  it("maps few clouds codes", () => {
    expect(mapWeatherCodeToCondition(801)).toBe(ConditionKeys.FewClouds);
    expect(mapWeatherCodeToCondition(802)).toBe(ConditionKeys.FewClouds);
  });

  it("maps clouds codes", () => {
    expect(mapWeatherCodeToCondition(803)).toBe(ConditionKeys.Clouds);
    expect(mapWeatherCodeToCondition(804)).toBe(ConditionKeys.Clouds);
  });

  it("maps unknown codes", () => {
    expect(mapWeatherCodeToCondition(999)).toBe(ConditionKeys.Unknown);
    expect(mapWeatherCodeToCondition(100)).toBe(ConditionKeys.Unknown);
  });
});
