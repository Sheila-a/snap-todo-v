export function capitalizeFirstWord(text) {
  if (!text) return "";
  const [first, ...rest] = text.trim().split(" ");
  return [first.charAt(0).toUpperCase() + first.slice(1), ...rest].join(" ");
}
