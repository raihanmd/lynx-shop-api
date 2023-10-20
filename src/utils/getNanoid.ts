import { nanoid } from "nanoid";

export function getNanoid(): string {
  return nanoid(10);
}
