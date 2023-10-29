"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNanoid = void 0;
const uuid_1 = require("uuid");
function getNanoid() {
    return (0, uuid_1.v4)().replace(/-/g, "").substring(0, 10);
}
exports.getNanoid = getNanoid;
