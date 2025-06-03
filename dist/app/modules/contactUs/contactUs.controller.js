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
exports.contactController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const contactUs_services_1 = require("./contactUs.services");
const send_success_1 = __importDefault(require("../utility/send-success"));
const catchAsync_1 = __importDefault(require("../utility/catchAsync"));
const createContact = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-expect-error error
    const user = req === null || req === void 0 ? void 0 : req.user;
    const result = yield contactUs_services_1.contactServices.createContactIntoDB(req.body, user);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Contact created successfully',
        data: result,
    });
}));
const singleContact = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield contactUs_services_1.contactServices.singleContactIntoDB(id);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Contact created successfully',
        data: result,
    });
}));
const deleteContact = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield contactUs_services_1.contactServices.deleteContactIntoDB(id);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Contact Delete successfully',
        data: result,
    });
}));
const contactForMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req === null || req === void 0 ? void 0 : req.params);
    const { id } = req.params;
    // @ts-expect-error user
    const user = req === null || req === void 0 ? void 0 : req.user;
    const result = yield contactUs_services_1.contactServices.contactForMeIntoDB(id, req.query, user);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'my contact retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const contactForHe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-expect-error user
    const user = req === null || req === void 0 ? void 0 : req.user;
    const { id } = req.params;
    const result = yield contactUs_services_1.contactServices.contactForHeIntoDB(id, req.query, user);
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'my contact retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const contactForMe2 = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contactUs_services_1.contactServices.contactForMeIntoDB2();
    (0, send_success_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Contact created successfully',
        data: result,
    });
}));
exports.contactController = {
    createContact,
    contactForMe2,
    singleContact,
    contactForMe,
    deleteContact,
    contactForHe,
};
