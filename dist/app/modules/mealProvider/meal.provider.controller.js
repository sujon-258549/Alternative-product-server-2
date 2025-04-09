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
exports.mealProviderController = void 0;
const catchAsync_1 = __importDefault(require("../utility/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const meal_provider_serves_1 = require("./meal.provider.serves");
const send_success_1 = __importDefault(require("../utility/send-success"));
const createMealProvider = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield meal_provider_serves_1.mealProviderServes.CreateMealProviderIntoDB(data, req.file, 
    // @ts-expect-error user
    req === null || req === void 0 ? void 0 : req.user);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'Meal Provider created successfully',
        data: result,
    });
}));
exports.mealProviderController = { createMealProvider };
