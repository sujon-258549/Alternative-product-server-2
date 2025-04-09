"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handelCastError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handelCastError = (err, res) => {
    res.status(http_status_1.default.BAD_REQUEST).json({
        success: false,
        message: err.message,
        err: err,
    });
};
exports.handelCastError = handelCastError;
