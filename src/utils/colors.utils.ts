export function lightenHexColor(hex: string, factor = 0.3): string {
  const colorValues = hex.replace("#", "");

  let r = parseInt(colorValues.substring(0, 2), 16);
  let g = parseInt(colorValues.substring(2, 4), 16);
  let b = parseInt(colorValues.substring(4, 6), 16);

  r = Math.round(r + (255 - r) * factor);
  g = Math.round(g + (255 - g) * factor);
  b = Math.round(b + (255 - b) * factor);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

export function getContrastColor(hex: string): string {
  const colorValues = hex.replace("#", "");

  let r = parseInt(colorValues.substring(0, 2), 16);
  let g = parseInt(colorValues.substring(2, 4), 16);
  let b = parseInt(colorValues.substring(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.7 ? "#3c3c3cff" : "#FFFFFFce";
}
