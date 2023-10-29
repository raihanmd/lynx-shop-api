"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUnixTime() {
    return Math.floor(new Date().getTime() / 1000);
}
exports.default = getUnixTime;
