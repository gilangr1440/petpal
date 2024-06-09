export const checkProperty = (property: any) => {
  if (property instanceof File) {
    if (property.size !== 0) return true;
  }

  if (typeof property === "string") {
    if (property !== "") return true;
  }

  if (typeof property === "boolean") {
    return true;
  }

  if (typeof property === "number") {
    return true;
  }

  if (typeof property === "object") {
    return true;
  }

  return false;
};
