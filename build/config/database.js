"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.con = void 0;
require("dotenv/config");
const promise_1 = require("mysql2/promise");
//@ts-ignore
exports.con = (0, promise_1.createPool)(process.env.DATABASE_URL);
