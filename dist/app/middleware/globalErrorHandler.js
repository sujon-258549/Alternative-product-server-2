"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const handelGenericError_1 = require("./helper/handelGenericError");
const handelDuplicateError_1 = require("./helper/handelDuplicateError");
const handelCastError_1 = require("./helper/handelCastError");
const handelValidationError_1 = require("./helper/handelValidationError");
const handelZodError_1 = require("./helper/handelZodError");
const globalErrorHandler = (err, req, res, next) => {
    // cast error
    if (err instanceof mongoose_1.default.Error.CastError) {
        (0, handelCastError_1.handelCastError)(err, res);
    }
    else if (err.code && err.code === 11000) {
        //duplicate error
        (0, handelDuplicateError_1.handelDuplicateError)(err, res);
    }
    else if (err instanceof mongoose_1.default.Error.ValidationError) {
        (0, handelValidationError_1.handelValidationError)(err, res);
    }
    else if (err.name && err.name === 'ZodError') {
        (0, handelZodError_1.handelZodError)(err, res);
    }
    else if (err instanceof Error) {
        //generic Error
        (0, handelGenericError_1.handelGenericError)(err, res);
    }
};
exports.globalErrorHandler = globalErrorHandler;
