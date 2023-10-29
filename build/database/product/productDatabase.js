"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAll_1 = require("./getAll");
const insertOne_1 = require("./insertOne");
const deleteOne_1 = require("./deleteOne");
const getDetail_1 = require("./getDetail");
const updateOne_1 = require("./updateOne");
exports.default = { getAll: getAll_1.getAll, insertOne: insertOne_1.insertOne, updateOne: updateOne_1.updateOne, deleteOne: deleteOne_1.deleteOne, getDetail: getDetail_1.getDetail };
