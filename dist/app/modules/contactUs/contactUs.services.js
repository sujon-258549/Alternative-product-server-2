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
exports.contactServices = void 0;
const contactUs_model_1 = __importDefault(require("./contactUs.model"));
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const register_model_1 = require("../Auth/simpleAuth/register.model");
const appError_1 = __importDefault(require("../../middleware/error/appError"));
const createContactIntoDB = (userData, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userData);
    const existUser = yield register_model_1.User.findOne({ _id: userData.sendId });
    // This condition is backwards - you're throwing if user EXISTS
    if (!existUser) {
        // Changed this condition
        throw new appError_1.default(401, 'user not exist');
    }
    userData.id = user.Id;
    // @ts-expect-error user
    userData.sendId = existUser._id;
    const newContact = yield contactUs_model_1.default.create(userData); // Changed variable name for clarity
    return newContact;
});
const contactForMeIntoDB = (id, query, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('sendId', id, 'userId', user === null || user === void 0 ? void 0 : user.Id);
    const newUser = new queryBuilder_1.default(contactUs_model_1.default.find({ sendId: id, id: user.Id }).populate('id').populate('sendId'), query)
        .sort()
        .fields()
        .filter();
    const meta = yield newUser.countTotal();
    const data = yield newUser.modelQuery;
    return { meta, data };
});
const contactForHeIntoDB = (id, query, user) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('sendid', id, user);
    const newUser = new queryBuilder_1.default(contactUs_model_1.default.find({ id: id, sendId: user.Id }).populate('id').populate('sendId'), query)
        .sort()
        .fields()
        .filter();
    const meta = yield newUser.countTotal();
    const data = yield newUser.modelQuery;
    return { meta, data };
});
const contactForMeIntoDB2 = () => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield contactUs_model_1.default.find().populate('sendId');
    return newUser;
});
const singleContactIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield contactUs_model_1.default.findById(id).populate('sendId');
    return newUser;
});
const deleteContactIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield contactUs_model_1.default.findByIdAndDelete(id);
    return newUser;
});
exports.contactServices = {
    createContactIntoDB,
    contactForMeIntoDB,
    singleContactIntoDB,
    contactForMeIntoDB2,
    deleteContactIntoDB,
    contactForHeIntoDB,
};
