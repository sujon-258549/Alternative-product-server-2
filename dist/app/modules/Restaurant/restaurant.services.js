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
exports.restaurantServices = void 0;
const restaurant_model_1 = require("./restaurant.model");
const appError_1 = __importDefault(require("../../middleware/error/appError"));
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const createMenuForDayIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = user === null || user === void 0 ? void 0 : user.id;
    payload.author_id = authorId;
    const existDay = yield restaurant_model_1.Restaurant.findOne({
        author_id: authorId,
        day: payload.day,
    });
    if (existDay) {
        throw new appError_1.default(500, 'Day already exists!');
    }
    const result = yield restaurant_model_1.Restaurant.create(payload);
    return result;
});
const findMyMenuForDayIntoDB = (user, query) => __awaiter(void 0, void 0, void 0, function* () {
    //   const result = await Restaurant.find({ id: user.author_id });
    const restorenet = new queryBuilder_1.default(restaurant_model_1.Restaurant.find(), query);
    const meta = yield restorenet.countTotal();
    const data = yield restorenet.modelQuery;
    return { meta, data };
});
exports.restaurantServices = {
    createMenuForDayIntoDB,
    findMyMenuForDayIntoDB,
};
