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
exports.sslServices = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const config_1 = __importDefault(require("../../config"));
const appError_1 = __importDefault(require("../../middleware/error/appError"));
const http_status_1 = __importDefault(require("http-status"));
const storeId = config_1.default.STORE_ID;
const storePassword = config_1.default.STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox
const insertPayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { total_amount, tran_id } = paymentData;
    const data = {
        total_amount,
        currency: 'BDT',
        tran_id, // use unique tran_id for each api call
        success_url: config_1.default.SUCCESS_URL,
        fail_url: config_1.default.FAIL_URL,
        cancel_url: config_1.default.CANCEL_URL,
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new sslcommerz_lts_1.default(storeId, storePassword, is_live);
    try {
        const apiResponse = yield sslcz.init(data);
        // Redirect the user to the payment gateway
        const GatewayPageURL = apiResponse.GatewayPageURL;
        if (GatewayPageURL) {
            return GatewayPageURL;
        }
        else {
            throw new appError_1.default(http_status_1.default.BAD_GATEWAY, 'Failed to generate payment gateway URL.');
        }
    }
    catch (error) {
        console.log(error);
        throw new appError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'An error occurred while processing payment.');
    }
});
exports.sslServices = { insertPayment };
