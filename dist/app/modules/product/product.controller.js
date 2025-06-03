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
exports.ProductController = void 0;
const catchAsync_1 = __importDefault(require("../utility/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const send_success_1 = __importDefault(require("../utility/send-success"));
const product_serves_1 = require("./product.serves");
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield product_serves_1.productServes.CreateProductIntoDB(data, 
    // @ts-expect-error user
    req === null || req === void 0 ? void 0 : req.user);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'Product created successfully',
        data: result,
    });
}));
const getAllProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req === null || req === void 0 ? void 0 : req.query;
    const result = yield product_serves_1.productServes.FindAllProductIntoDb(query);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'All Product retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_serves_1.productServes.FindSingleProductIntoDb(id);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Single Product retrieved successfully',
        data: result,
    });
}));
const deleteMyProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-expect-error user
    const user = req === null || req === void 0 ? void 0 : req.user;
    const { id } = req.params;
    const result = yield product_serves_1.productServes.deleteMyProductIntoDb(id, user);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'My Product delete successfully',
        data: result,
    });
}));
const findMyProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-expect-error user
    const user = req === null || req === void 0 ? void 0 : req.user;
    const result = yield product_serves_1.productServes.findMyProductIntoDb(req.query, user);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'My Product retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const updateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { id } = req.params;
    // @ts-expect-error user
    const user = req.user;
    const result = yield product_serves_1.productServes.UpdateMyProductIntoDb(data, user, id);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Product update successfully',
        data: result,
    });
}));
exports.ProductController = {
    createProduct,
    getAllProduct,
    findMyProduct,
    getSingleProduct,
    deleteMyProduct,
    updateProduct,
};
