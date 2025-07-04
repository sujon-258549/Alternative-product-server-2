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
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const register_services_1 = require("./register.services");
const send_success_1 = __importDefault(require("../../utility/send-success"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const CreateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield register_services_1.UserServices.createUserIntoDB(data);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'User Registered successfully',
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    // @ts-expect-error user
    const user = req === null || req === void 0 ? void 0 : req.user;
    const result = yield register_services_1.UserServices.updateUserIntoDB(data, user);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'Update User successfully',
        data: result,
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield register_services_1.UserServices.loginUserIntoDB(data);
    const { accessToken, refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.NODE_ENV !== 'development',
        httpOnly: true,
    });
    res.cookie('accessToken', accessToken, {
        secure: config_1.default.NODE_ENV !== 'development',
        httpOnly: true,
    });
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'User login successfully',
        data: {
            accessToken,
            refreshToken,
        },
    });
}));
const refreshTokenUseCreateSecretToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const { accessToken } = yield register_services_1.UserServices.createRefreshTokenIntoDB(refreshToken);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'Create Access Token successfully',
        data: { accessToken },
    });
}));
const forgetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield register_services_1.UserServices.forgetPassword(user);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'Reset link is gangrened  successfully',
        data: result,
    });
}));
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield register_services_1.UserServices.resetPassword(data);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'Password reset  successfully',
        data: result,
    });
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // @ts-expect-error user
    const token = req === null || req === void 0 ? void 0 : req.user;
    const result = yield register_services_1.UserServices.changePassword(body, token);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'Password change  successfully',
        data: result,
    });
}));
const setImageIntoUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req === null || req === void 0 ? void 0 : req.file;
    // @ts-expect-error user
    const token = req === null || req === void 0 ? void 0 : req.user;
    const result = yield register_services_1.UserServices.setImageIntoUser(file, token);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'Image change  successfully',
        data: result,
    });
}));
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield register_services_1.UserServices.getAllUserFromDB(req.query);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'All user retrieved   successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-expect-error user
    const token = req === null || req === void 0 ? void 0 : req.user;
    const result = yield register_services_1.UserServices.getMeFromDB(token);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'My date retrieved   successfully',
        data: result,
    });
}));
exports.UserController = {
    CreateUser,
    loginUser,
    refreshTokenUseCreateSecretToken,
    forgetPassword,
    resetPassword,
    changePassword,
    setImageIntoUser,
    getMe,
    updateUser,
    getAllUser,
};
