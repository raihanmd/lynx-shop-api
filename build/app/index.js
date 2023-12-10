"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
//@ts-ignore
const cors_1 = __importDefault(require("cors"));
const cahceControl_1 = __importDefault(require("../cahce/cahceControl"));
const mainRouter_1 = require("../routes/mainRouter");
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const APIKeyCheckMiddleware_1 = require("../middleware/APIKeyCheckMiddleware");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(APIKeyCheckMiddleware_1.APIKeyCheckMiddleware);
app.use((0, cahceControl_1.default)(300));
app.use("/v1", mainRouter_1.mainRouter);
app.use(errorMiddleware_1.errorMiddleware);
