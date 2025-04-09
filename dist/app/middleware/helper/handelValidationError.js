"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handelValidationError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handelValidationError = (err, res) => {
    const issues = Object.values(err.errors).map((item) => {
        return {
            path: item.path,
            message: item.message,
        };
    });
    res.status(http_status_1.default.BAD_REQUEST).json({
        success: false,
        message: err.message,
        issues: issues,
        err: err,
    });
};
exports.handelValidationError = handelValidationError;
