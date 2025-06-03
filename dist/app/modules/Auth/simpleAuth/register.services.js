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
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const appError_1 = __importDefault(require("../../../middleware/error/appError"));
const register_model_1 = require("./register.model");
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendEmail_1 = require("../../utility/sendEmail");
const uploadImageCloudinary_1 = require("../../utility/uploadImageCloudinary");
const queryBuilder_1 = __importDefault(require("../../../builder/queryBuilder"));
// create user
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield register_model_1.User.create(payload);
    return result;
});
const updateUserIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
    const existUser = yield register_model_1.User.findOne({ email: user.email });
    if (!existUser) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User not found.');
    }
    const result = yield register_model_1.User.findOneAndUpdate({ email: existUser.email }, payload, { new: true });
    return result;
});
const loginUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
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
        Id: existUser._id,
    };
    const accessToken = (0, auth_utils_1.createToken)(
    // @ts-expect-error token
    JwtPayload, config_1.default.ACCESS_SECRET, config_1.default.ACCESS_EXPIRE_IN);
    const refreshToken = (0, auth_utils_1.createToken)(
    // @ts-expect-error token
    JwtPayload, config_1.default.REFRESH_SECRET, config_1.default.REFRESH_EXPIRE_IN);
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
        Id: existUser._id,
    };
    const accessToken = (0, auth_utils_1.createToken)(
    // @ts-expect-error token
    JwtPayload, config_1.default.ACCESS_SECRET, config_1.default.ACCESS_EXPIRE_IN);
    return { accessToken };
});
// const forgetPassword = async (userInfo: { email: string }) => {
//   const existEmail = await User.findOne({ email: userInfo.email });
//   console.log('userInfo', existEmail);
//   if (!existEmail) {
//     throw new AppError(httpStatus.UNAUTHORIZED, 'User not found.');
//   }
//   const JwtPayload = {
//     email: existEmail.email,
//     role: existEmail.role,
//     Id: existEmail._id,
//   };
//   const accessToken = createToken(
//     // @ts-expect-error token
//     JwtPayload,
//     config.ACCESS_SECRET as string,
//     '10m',
//   );
//   const resetUrlLink = `${config.RESET_UI_LINK}?email=${existEmail?.email}&token=${accessToken}`;
//   sendEmail(existEmail.email, resetUrlLink);
// };
const forgetPassword = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user exists by email
    console.log(userInfo);
    const existingUser = yield register_model_1.User.findOne({ email: userInfo.email });
    if (!existingUser) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User not found.');
    }
    // Create the payload for the JWT
    const jwtPayload = {
        email: existingUser.email,
        role: existingUser.role,
        id: existingUser._id.toString(),
    };
    // Generate a short-lived token (10 minutes)
    const token = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.ACCESS_SECRET, '10m');
    // Generate the reset password link
    const resetUrl = `${config_1.default.RESET_UI_LINK}?email=${existingUser.email}&token=${token}`;
    // Send the email
    yield (0, sendEmail_1.sendEmail)(existingUser.email, resetUrl);
});
const resetPassword = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Verify JWT Token
    const payload = JSON.parse(atob(data.token.split('.')[1]));
    console.log('Token Payload fsadfsa :', payload === null || payload === void 0 ? void 0 : payload.email);
    // Now use the token (e.g., decode or verify)
    // let decoded: JwtPayload;
    // try {
    //   decoded = jwt.verify(payload, config.ACCESS_SECRET as string) as JwtPayload;
    // } catch (err) {
    //   throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired token');
    // }
    // 3. Check User Existence
    const user = yield register_model_1.User.findOne({ _id: payload === null || payload === void 0 ? void 0 : payload.id });
    if (!user) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // // 4. Verify Email Match
    // if (data.email !== user.email) {
    //   throw new AppError(httpStatus.UNAUTHORIZED, 'Email does not match token');
    // }
    // 5. Hash New Password
    const hashedPassword = yield bcrypt_1.default.hash(data.newPassword, 10); // Salt rounds: 10
    // 6. Update User Password
    const updatedUser = yield register_model_1.User.findOneAndUpdate({ _id: payload.id }, { password: hashedPassword }, { new: true });
    if (!updatedUser) {
        throw new appError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to update password');
    }
    return updatedUser;
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
const getAllUserFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    const result = new queryBuilder_1.default(register_model_1.User.find().select('-password'), query)
        .search(['fullName', 'email'])
        .filter()
        .fields()
        .sort();
    const meta = yield result.countTotal();
    const data = yield result.modelQuery;
    return { meta, data };
});
const getMeFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield register_model_1.User.findById(user.Id).select('-password');
    return result;
});
const setImageIntoUser = (file, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { Id } = user;
    const isExistUser = yield register_model_1.User.findOne({ Id });
    if (!isExistUser) {
        return new appError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (file) {
        const path = file === null || file === void 0 ? void 0 : file.path;
        const name = isExistUser.fullName.replace(/\s+/g, '_').toLowerCase();
        const { secure_url } = (yield (0, uploadImageCloudinary_1.sendImageToCloudinary)(name, path));
        if (!secure_url) {
            return new appError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Image not found');
        }
        isExistUser.profileImage = secure_url;
        return yield isExistUser.save();
    }
    return isExistUser;
});
exports.UserServices = {
    createUserIntoDB,
    loginUserIntoDB,
    createRefreshTokenIntoDB,
    forgetPassword,
    resetPassword,
    changePassword,
    setImageIntoUser,
    getMeFromDB,
    updateUserIntoDB,
    getAllUserFromDB,
};
