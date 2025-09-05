import { countryCodeToFlagEmoji } from "./search.utils";

test("converts country code to flag emoji", () => {
  expect(countryCodeToFlagEmoji("us")).toBe("🇺🇸");
  expect(countryCodeToFlagEmoji("gb")).toBe("🇬🇧");
  expect(countryCodeToFlagEmoji("de")).toBe("🇩🇪");
});
