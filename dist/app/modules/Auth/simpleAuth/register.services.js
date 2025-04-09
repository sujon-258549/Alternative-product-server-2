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
exports.UserServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const appError_1 = __importDefault(require("../../../middleware/error/appError"));
const register_model_1 = require("./register.model");
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uploadImageCloudinary_1 = require("../../utility/uploadImageCloudinary");
const sendEmail_1 = require("../../utility/sendEmail");
const createUserIntoDB = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ file });
    const profileImage = yield (0, uploadImageCloudinary_1.sendImageCloudinary)(payload.phone.toString(), file === null || file === void 0 ? void 0 : file.path);
    // @ts-expect-error url
    payload.profileImage = profileImage === null || profileImage === void 0 ? void 0 : profileImage.secure_url;
    const result = yield register_model_1.User.create(payload);
    return result;
});
const loginUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const existUser = yield register_model_1.User.findOne({ email: payload.email });
    if (!existUser) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User not found.');
    }
    const comparePassword = yield bcrypt_1.default.compare(payload.password, existUser.password);
    if (!comparePassword) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'Incorrect password.');
    }
    const JwtPayload = {
        email: existUser.email,
        role: existUser.role,
        id: existUser._id,
    };
    const accessToken = (0, auth_utils_1.createToken)(
    // @ts-expect-error token
    JwtPayload, config_1.default.ACCESS_SECRET, config_1.default.ACCESS_EXPIRE_IN);
    const refreshToken = (0, auth_utils_1.createToken)(
    // @ts-expect-error token
    JwtPayload, config_1.default.REFRESH_SECRET, config_1.default.REFRESH_EXPIRE_IN);
    console.log({ accessToken, refreshToken });
    return {
        accessToken,
        refreshToken,
    };
});
const createRefreshTokenIntoDB = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = jsonwebtoken_1.default.verify(token, config_1.default.REFRESH_SECRET);
    const existUser = yield register_model_1.User.findOne({ email: email });
    if (!existUser) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User not found.');
    }
    const JwtPayload = {
        email: existUser.email,
        role: existUser.role,
        id: existUser._id,
    };
    const accessToken = (0, auth_utils_1.createToken)(
    // @ts-expect-error token
    JwtPayload, config_1.default.ACCESS_SECRET, config_1.default.ACCESS_EXPIRE_IN);
    return { accessToken };
});
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(email);
    const existEmail = yield register_model_1.User.findOne({ email: email });
    if (!existEmail) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User not found.');
    }
    const JwtPayload = {
        email: existEmail.email,
        role: existEmail.role,
        id: existEmail._id,
    };
    const accessToken = (0, auth_utils_1.createToken)(
    // @ts-expect-error token
    JwtPayload, config_1.default.ACCESS_SECRET, '10m');
    const resetUrlLink = `${config_1.default.RESET_UI_LINK}?email=${existEmail === null || existEmail === void 0 ? void 0 : existEmail.email}&token=${accessToken}`;
    console.log(resetUrlLink);
    (0, sendEmail_1.sendEmail)(existEmail.email, resetUrlLink);
});
const resetPassword = (payload, data) => __awaiter(void 0, void 0, void 0, function* () {
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(payload, config_1.default.ACCESS_SECRET);
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    }
    catch (err) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User is not authorized');
    }
    if (!decoded) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User is not authorized');
    }
    const user = yield register_model_1.User.findOne({ _id: decoded.id });
    if (data.email != (user === null || user === void 0 ? void 0 : user.email)) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User is not authorized');
    }
    console.log(user.email);
    const hasPassword = yield bcrypt_1.default.hash(data === null || data === void 0 ? void 0 : data.newPassword, 5);
    const result = yield register_model_1.User.findOneAndUpdate({ email: user.email }, // ✅ this is correct for filtering by email
    { password: hasPassword }, // ✅ new password to set
    { new: true });
    return result;
});
const changePassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const existEmail = yield register_model_1.User.findOne({ email: token === null || token === void 0 ? void 0 : token.email });
    if (!existEmail) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User not found.');
    }
    const comparePassword = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.oldPassword, existEmail === null || existEmail === void 0 ? void 0 : existEmail.password);
    if (!comparePassword) {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, 'Your password is not correct');
    }
    const hasPassword = yield bcrypt_1.default.hash(payload.newPassword, 5);
    const result = yield register_model_1.User.findOneAndUpdate({ email: existEmail.email }, // ✅ this is correct for filtering by email
    { password: hasPassword }, // ✅ new password to set
    { new: true });
    return result;
});
exports.UserServices = {
    createUserIntoDB,
    loginUserIntoDB,
    createRefreshTokenIntoDB,
    forgetPassword,
    resetPassword,
    changePassword,
};
