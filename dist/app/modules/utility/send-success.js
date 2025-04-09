"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendSuccess = (res, data) => {
    res.status(data.statuscode).json({
        success: data.success,
        message: data.message,
        meta: data.meta,
        data: data.data,
    });
};
exports.default = sendSuccess;
