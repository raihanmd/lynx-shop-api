"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = void 0;
class DatabaseError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.DatabaseError = DatabaseError;
