"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRouter = void 0;
const express_1 = require("express");
const restaurant_controller_1 = require("./restaurant.controller");
const auth_1 = __importDefault(require("../utility/auth"));
const register_const_1 = require("../Auth/simpleAuth/register.const");
const router = (0, express_1.Router)();
router.post('/menu', (0, auth_1.default)(register_const_1.UserRole.restaurant), restaurant_controller_1.restaurantController.createMenuForDay);
router.get('/menu', (0, auth_1.default)(register_const_1.UserRole.restaurant), restaurant_controller_1.restaurantController.findMyMenu);
exports.restaurantRouter = router;
