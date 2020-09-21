export function stringToMoney(s) {
  if (typeof s !== "number") {
    return Number(s).toFixed(2);
  } else {
    return s.toFixed(2);
  }
}
