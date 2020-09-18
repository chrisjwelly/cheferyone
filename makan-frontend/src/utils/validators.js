export function notEmpty(value) {
  if (typeof value !== "string" || value.trim().length > 0) {
    return { isValid: true };
  }

  return { isValid: false, message: "Cannot be empty" };
}
