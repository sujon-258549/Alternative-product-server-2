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
exports.productServes = void 0;
const appError_1 = __importDefault(require("../../middleware/error/appError"));
const register_model_1 = require("../Auth/simpleAuth/register.model");
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const productr_mode_1 = __importDefault(require("./productr.mode"));
const CreateProductIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const existId = yield register_model_1.User.findOne({ _id: user === null || user === void 0 ? void 0 : user.Id });
    if (!existId) {
        throw new appError_1.default(404, 'User does not exist!');
    }
    // @ts-expect-error user id
    payload.authorId = existId._id;
    const result = yield productr_mode_1.default.create(payload);
    return result;
});
const FindAllProductIntoDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { minPrice, maxPrice } = query;
    console.log('Min and Max Prices', minPrice, maxPrice, query);
    const result = new queryBuilder_1.default(productr_mode_1.default.find().populate('authorId'), query)
        .search([
        'productName',
        'categories',
        'shortDescription',
        'description',
        'currency',
        'brandName',
    ])
        .sort()
        .fields()
        .filter()
        .paginate()
        .priceRange(minPrice != null ? Number(minPrice) : undefined, maxPrice != null ? Number(maxPrice) : undefined);
    const meta = yield result.countTotal();
    const data = yield result.modelQuery;
    return { meta, data };
});
const FindSingleProductIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productr_mode_1.default.findById(id).populate('authorId');
    return result;
});
const deleteMyProductIntoDb = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productr_mode_1.default.findOneAndDelete({
        _id: id,
        authorId: user.Id,
    });
    return result;
});
const findMyProductIntoDb = (query, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
    const result = new queryBuilder_1.default(productr_mode_1.default.find({ authorId: user.Id }).populate('authorId'), query)
        .search([
        'categories',
        'shortDescription',
        'description',
        'currency',
        'productName',
        'brandName',
    ])
        .sort()
        .fields()
        .paginate()
        .filter();
    const meta = yield result.countTotal();
    const data = yield result.modelQuery;
    return { meta, data };
});
const UpdateMyProductIntoDb = (payload, user, id) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate payload is not empty
    if (!payload || Object.keys(payload).length === 0) {
        throw new appError_1.default(400, 'Update payload cannot be empty');
    }
    if (typeof (payload === null || payload === void 0 ? void 0 : payload.isDigital) === 'string') {
        payload.isDigital =
            payload.isDigital && payload.isDigital === 'yes' ? true : false;
    }
    // Find the product that belongs to this user
    const existingProduct = yield productr_mode_1.default.findOne({ _id: id, authorId: user.Id });
    if (!existingProduct) {
        throw new appError_1.default(404, 'Product not found or you are not authorized to update it');
    }
    // Perform the update
    const updatedProduct = yield productr_mode_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!updatedProduct) {
        throw new appError_1.default(500, 'Failed to update product');
    }
    return updatedProduct;
});
exports.productServes = {
    CreateProductIntoDB,
    FindAllProductIntoDb,
    findMyProductIntoDb,
    FindSingleProductIntoDb,
    UpdateMyProductIntoDb,
    deleteMyProductIntoDb,
};
