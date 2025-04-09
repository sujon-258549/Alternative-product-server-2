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
exports.sosalAuthController = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const sosalauth_servises_1 = require("./sosalauth.servises");
const send_success_1 = __importDefault(require("../../utility/send-success"));
const http_status_1 = __importDefault(require("http-status"));
const createAuthLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(data);
    const result = yield sosalauth_servises_1.sosalAuthServices.createSosalUserIntoDB(data);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'Sosal Login successfully',
        data: result,
    });
}));
exports.sosalAuthController = { createAuthLogin };
