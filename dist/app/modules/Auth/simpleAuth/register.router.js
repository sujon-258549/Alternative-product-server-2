"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const register_controller_1 = require("./register.controller");
const register_Validation_1 = require("./register.Validation");
const zodValidation_1 = __importDefault(require("../../utility/zodValidation"));
const uploadImageCloudinary_1 = require("../../utility/uploadImageCloudinary");
const auth_1 = __importDefault(require("../../utility/auth"));
const register_const_1 = require("./register.const");
const router = (0, express_1.Router)();
router.post('/register', uploadImageCloudinary_1.upload.single('file'), (req, res, next) => {
    console.log(req.body.data);
    req.body = JSON.parse(req.body.data);
    next();
}, 
//   zodValidation(userValidation.registerSchema),
register_controller_1.UserController.CreateUser);
router.post('/login', register_controller_1.UserController.loginUser);
router.post('/create-access-token', (0, zodValidation_1.default)(register_Validation_1.userValidation.refreshTokenSchema), register_controller_1.UserController.refreshTokenUseCreateSecretToken);
router.post('/forget-password', register_controller_1.UserController.forgetPassword);
router.post('/reset-password', register_controller_1.UserController.resetPassword);
router.post('/change-password', (0, auth_1.default)(register_const_1.UserRole.admin, register_const_1.UserRole.user, register_const_1.UserRole.restaurant), register_controller_1.UserController.changePassword);
exports.userRouter = router;
