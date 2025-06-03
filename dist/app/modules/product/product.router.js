"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../utility/auth"));
const register_const_1 = require("../Auth/simpleAuth/register.const");
const product_controller_1 = require("./product.controller");
const router = (0, express_1.Router)();
router.post('/create-product', (0, auth_1.default)(register_const_1.UserRole.user), product_controller_1.ProductController.createProduct);
// get all product
router.get('/', product_controller_1.ProductController.getAllProduct);
router.get('/my-product', (0, auth_1.default)('user'), product_controller_1.ProductController.findMyProduct);
router.get('/:id', product_controller_1.ProductController.getSingleProduct);
router.delete('/my-product/:id', (0, auth_1.default)('user'), product_controller_1.ProductController.deleteMyProduct);
router.patch('/my-product/:id', (0, auth_1.default)(register_const_1.UserRole.user), product_controller_1.ProductController.updateProduct);
exports.product = router;
