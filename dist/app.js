"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const Router_1 = __importDefault(require("./app/Router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// router
app.use('/api', Router_1.default);
app.get('/', (req, res) => {
    res.send('Hello Everyone');
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use('*', (req, res) => {
    res.status(400).json({ status: false, message: 'Route not found!' });
});
exports.default = app;
