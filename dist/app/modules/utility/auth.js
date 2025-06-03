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
const catchAsync_1 = __importDefault(require("./catchAsync"));
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = __importDefault(require("../../middleware/error/appError"));
const http_status_1 = __importDefault(require("http-status"));
const register_model_1 = require("../Auth/simpleAuth/register.model");
const auth = (...requiredRole) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        let decoded;
        if (!token || typeof token !== 'string') {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'No token provided');
        }
        try {
            decoded = jsonwebtoken_1.default.verify(token, config_1.default.ACCESS_SECRET);
            // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        }
        catch (err) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User is not authorized');
        }
        if (!decoded) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User is not authorized');
        }
        const user = yield register_model_1.User.findOne({ _id: decoded.Id });
        if (!user) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Your User Id is Invalid!');
        }
        if (requiredRole && !(requiredRole === null || requiredRole === void 0 ? void 0 : requiredRole.includes(decoded === null || decoded === void 0 ? void 0 : decoded.role))) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User does not have the required permissions');
        }
        // @ts-expect-error user
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
