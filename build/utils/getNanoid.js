import { v4 } from "uuid";
export function getNanoid() {
    return v4().replace(/-/g, "").substring(0, 10);
}
