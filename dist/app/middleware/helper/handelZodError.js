"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handelZodError = void 0;
const handelZodError = (err, res) => {
    const issues = err.issues.map((item) => {
        return {
            path: item.path.join(' '),
            message: item,
        };
    });
    res.status(400).json({
        success: false,
        message: err.message,
        issues: issues,
        err: err,
    });
};
exports.handelZodError = handelZodError;
