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
exports.recommendationServices = void 0;
const productr_mode_1 = __importDefault(require("../product/productr.mode"));
const mongoose_1 = require("mongoose");
const recommendation_model_1 = __importDefault(require("./recommendation.model"));
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const createRecommendationIntoDb = (payload, user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const findAuthorId = yield productr_mode_1.default.findById(id);
    payload.authorId = findAuthorId === null || findAuthorId === void 0 ? void 0 : findAuthorId.authorId;
    payload.recommendationAuthorId = user.Id;
    payload.productId = id;
    const result = yield recommendation_model_1.default.create(payload);
    return result;
});
const fondSpecifyRecommendationIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recommendation_model_1.default.find({ productId: id });
    return result;
});
const allRecommendedIntoDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    const recommendation = new queryBuilder_1.default(recommendation_model_1.default.find()
        .populate('productId')
        .populate('recommendationAuthorId')
        .populate('authorId'), query)
        .search([
        'categories',
        'shortDescription',
        'description',
        'currency',
        'productName',
        'brandName',
    ])
        .sort()
        .paginate()
        .fields()
        .filter();
    const meta = yield recommendation.countTotal();
    const data = yield recommendation.modelQuery;
    return { meta, data };
});
const myRecommendationIntoDb = (user, query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    const recommendation = new queryBuilder_1.default(recommendation_model_1.default.find({ recommendationAuthorId: user.Id })
        .populate('productId')
        .populate('recommendationAuthorId')
        .populate('authorId'), query)
        .search([
        'categories',
        'shortDescription',
        'description',
        'currency',
        'productName',
        'brandName',
    ])
        .sort()
        .paginate()
        .fields()
        .filter();
    const meta = yield recommendation.countTotal();
    const data = yield recommendation.modelQuery;
    return { meta, data };
});
const recommendationForMeIntoDb = (user, query) => __awaiter(void 0, void 0, void 0, function* () {
    const recommendation = new queryBuilder_1.default(recommendation_model_1.default.find({ authorId: user.Id })
        .populate('productId')
        .populate('recommendationAuthorId')
        .populate('authorId'), query)
        .search([
        'categories',
        'shortDescription',
        'description',
        'currency',
        'productName',
        'brandName',
    ])
        .sort()
        .paginate()
        .fields()
        .filter();
    const meta = yield recommendation.countTotal();
    const data = yield recommendation.modelQuery;
    return { meta, data };
});
const recommendationRelatedProductIntoDb = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const recommendation = new queryBuilder_1.default(recommendation_model_1.default.find({ productId: id })
        .populate('productId')
        .populate('recommendationAuthorId')
        .populate('authorId'), query)
        .search([
        'categories',
        'shortDescription',
        'description',
        'currency',
        'productName',
        'brandName',
    ])
        .sort()
        .paginate()
        .fields()
        .filter();
    const meta = yield recommendation.countTotal();
    const data = yield recommendation.modelQuery;
    return { meta, data };
});
const deleteMyRecommendationIntoDb = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recommendation_model_1.default.findByIdAndDelete({
        _id: id,
        recommendationAuthorId: user.Id,
    });
    return result;
});
const findSingleRecommendationIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recommendation_model_1.default.findById(id)
        .populate('productId')
        .populate('recommendationAuthorId')
        .populate('authorId');
    return result;
});
const updateRecommendationIntoDb = (id, user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof (payload === null || payload === void 0 ? void 0 : payload.isDigital) === 'string') {
        payload.isDigital =
            payload.isDigital && payload.isDigital === 'yes' ? true : false;
    }
    const result = yield recommendation_model_1.default.findOneAndUpdate({
        _id: new mongoose_1.Types.ObjectId(id),
        recommendationAuthorId: user.userId,
    }, payload, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on update
    });
    return result;
});
exports.recommendationServices = {
    createRecommendationIntoDb,
    fondSpecifyRecommendationIntoDb,
    myRecommendationIntoDb,
    recommendationForMeIntoDb,
    deleteMyRecommendationIntoDb,
    findSingleRecommendationIntoDb,
    updateRecommendationIntoDb,
    allRecommendedIntoDb,
    recommendationRelatedProductIntoDb,
};
