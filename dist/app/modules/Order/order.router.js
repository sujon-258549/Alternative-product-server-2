"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../utility/auth"));
const register_const_1 = require("../Auth/simpleAuth/register.const");
const order_controller_1 = require("./order.controller");
const router = (0, express_1.Router)();
router.post('/create-order', (0, auth_1.default)(register_const_1.UserRole.user), order_controller_1.orderController.createOrder);
// router.get('/menu', auth(UserRole.restaurant), restaurantController.findMyMenu);
exports.orderRouter = router;
