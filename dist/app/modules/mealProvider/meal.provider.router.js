"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealProviderRouter = void 0;
const express_1 = require("express");
// import auth from '../utility/auth';
// import { UserRole } from '../Auth/register.const';
const meal_provider_controller_1 = require("./meal.provider.controller");
const uploadImageCloudinary_1 = require("../utility/uploadImageCloudinary");
const auth_1 = __importDefault(require("../utility/auth"));
const register_const_1 = require("../Auth/simpleAuth/register.const");
const router = (0, express_1.Router)();
router.post('/create-mealProvider', (0, auth_1.default)(register_const_1.UserRole.user), uploadImageCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, 
//   auth(UserRole.user),
meal_provider_controller_1.mealProviderController.createMealProvider);
// router.get('/menu', auth(UserRole.restaurant), restaurantController.findMyMenu);
exports.mealProviderRouter = router;
