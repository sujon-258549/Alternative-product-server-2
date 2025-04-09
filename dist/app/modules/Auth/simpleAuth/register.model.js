"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const addressSchema = new mongoose_1.Schema({
    village: { type: String, required: true },
    district: { type: String, required: true },
    subDistrict: { type: String, required: true },
    post: { type: String, required: true },
    postCode: { type: String, required: true },
}, { _id: false });
const UserSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    nidNumber: {
        type: Number,
    },
    role: {
        type: String,
        enum: ['admin', 'restaurant', 'user'],
        default: 'user',
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    address: {
        type: addressSchema,
        required: true,
    },
    isShop: {
        type: Boolean,
        default: false,
    },
    secondaryPhone: {
        type: Number,
        required: true,
        unique: true,
    },
    profileImage: {
        type: String,
    },
    isBlock: {
        type: Boolean,
        default: false,
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
// Hash password before saving
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        this.password = yield bcrypt_1.default.hash(this.password, 5);
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
