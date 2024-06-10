import { Services } from "../doctor";

export function getKeyByValue(object: Services) {
  const arr: string[] = [];
  for (const prop in object) {
    arr.push(prop);
  }
  return arr.toString();
}
