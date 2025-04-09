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
exports.orderServes = void 0;
const order_model_1 = require("./order.model");
const appError_1 = __importDefault(require("../../middleware/error/appError"));
const http_status_1 = __importDefault(require("http-status"));
const sslCommeriz_servises_1 = require("../sslCommeriz/sslCommeriz.servises");
const meal_provider_mode_1 = __importDefault(require("../mealProvider/meal.provider.mode"));
const createOrderIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ payload, user });
    // Assign user ID to the order
    payload.orderId = user.id;
    const existAuthorId = yield meal_provider_mode_1.default.findOne({
        userid: payload.author_id,
    });
    if (!existAuthorId) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'Author Id not Authorize');
    }
    // Calculate the total price into days
    const totalPrice = payload.days.reduce((acc, day) => {
        var _a, _b, _c;
        return (acc +
            (((_a = day.morning) === null || _a === void 0 ? void 0 : _a.price) || 0) +
            (((_b = day.evening) === null || _b === void 0 ? void 0 : _b.price) || 0) +
            (((_c = day.night) === null || _c === void 0 ? void 0 : _c.price) || 0));
    }, 0);
    payload.total_price = totalPrice;
    const res = yield order_model_1.Order.create(payload);
    const digits = Array.from({ length: 20 }, () => Math.floor(Math.random() * 10)).join('');
    const bigIntNumber = BigInt(digits);
    let result;
    if (res) {
        result = yield sslCommeriz_servises_1.sslServices.insertPayment({
            total_amount: totalPrice,
            //  @ts-expect-error tran
            tran_id: bigIntNumber,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        result = { paymentUrl: result };
    }
    return res; // Include total price in the response
});
exports.orderServes = { createOrderIntoDB };
