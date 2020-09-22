export function stringToMoney(s) {
  if (typeof s !== "number") {
    return Number(s).toFixed(2);
  } else {
    return s.toFixed(2);
  }
}

export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
