"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SosalAuth = void 0;
const mongoose_1 = require("mongoose");
const sosalLoginSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    profileImage: {
        type: String,
    },
}, { timestamps: true });
exports.SosalAuth = (0, mongoose_1.model)('SosalLogin', sosalLoginSchema);
