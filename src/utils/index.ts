export const stringToColor = (
  string: string,
  // saturation = 80,
  // lightness = 63,
  minSaturation = 50,
  maxSaturation = 60,
  minLightness = 50,
  maxLightness = 63
): string => {
  let hash = 5;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 6) - hash);
    hash = hash & hash;
  }
  const saturation =
    ((maxSaturation - minSaturation) / 100) * Math.abs(hash % 100) +
    minSaturation;
  const lightness =
    ((maxLightness - minLightness) / 100) * Math.abs(hash % 100) + minLightness;
  return `hsl(${hash % 360}, ${saturation}%, ${lightness}%)`;
};

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(min, value), max);

export const toggleArray = <T>(array: T[], item: T): T[] => {
  if (array.includes(item)) {
    return array.filter((i) => i !== item);
  }
  return [...array, item];
};
