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
exports.recommendationController = void 0;
const catchAsync_1 = __importDefault(require("../utility/catchAsync"));
const send_success_1 = __importDefault(require("../utility/send-success"));
const recommendationservices_1 = require("./recommendationservices");
const http_status_1 = __importDefault(require("http-status"));
const createRecommendation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-expect-error user
    const user = req === null || req === void 0 ? void 0 : req.user;
    const { id } = req.params;
    const result = yield recommendationservices_1.recommendationServices.createRecommendationIntoDb(req.body, user, id);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Create recommendation successfully',
        data: result,
    });
}));
const findAllRecommendation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recommendationservices_1.recommendationServices.allRecommendedIntoDb(req.query);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'All Recommendation retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const findSpecifyRecommendation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield recommendationservices_1.recommendationServices.fondSpecifyRecommendationIntoDb(id);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Recommendation retrieved successfully',
        data: result,
    });
}));
const findSingleRecommendation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield recommendationservices_1.recommendationServices.findSingleRecommendationIntoDb(id);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Find my recommendation  successfully',
        data: result,
    });
}));
const myRecommendation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-expect-error user
    const user = req === null || req === void 0 ? void 0 : req.user;
    const result = yield recommendationservices_1.recommendationServices.myRecommendationIntoDb(user, req.query);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'My recommendation retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const recommendationRelatedProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield recommendationservices_1.recommendationServices.recommendationRelatedProductIntoDb(id, req.query);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'My recommendation retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const recommendationForMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-expect-error user
    const user = req === null || req === void 0 ? void 0 : req.user;
    const result = yield recommendationservices_1.recommendationServices.recommendationForMeIntoDb(user, req.query);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'My Product recommendation retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const deleteRecommendation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-expect-error user
    const user = req === null || req === void 0 ? void 0 : req.user;
    const { id } = req.params;
    const result = yield recommendationservices_1.recommendationServices.deleteMyRecommendationIntoDb(id, user);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Delete My recommendation  successfully',
        data: result,
    });
}));
const updateMyRecommendation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // @ts-expect-error user
    const user = req === null || req === void 0 ? void 0 : req.user;
    const result = yield recommendationservices_1.recommendationServices.updateRecommendationIntoDb(id, user, req.body);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Update my recommendation  successfully',
        data: result,
    });
}));
exports.recommendationController = {
    createRecommendation,
    findSpecifyRecommendation,
    myRecommendation,
    recommendationForMe,
    deleteRecommendation,
    findSingleRecommendation,
    updateMyRecommendation,
    findAllRecommendation,
    recommendationRelatedProduct,
};
