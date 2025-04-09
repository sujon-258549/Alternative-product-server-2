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
exports.mealProviderServes = void 0;
const meal_provider_mode_1 = __importDefault(require("./meal.provider.mode"));
const uploadImageCloudinary_1 = require("./../utility/uploadImageCloudinary");
const CreateMealProviderIntoDB = (payload, file, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(file, user);
    const path = file === null || file === void 0 ? void 0 : file.path;
    const name = payload.shopName;
    const shopLogo = yield (0, uploadImageCloudinary_1.sendImageCloudinary)(name, path);
    payload.userid = user.id;
    // @ts-expect-error secure_url
    payload.shopLogo = shopLogo === null || shopLogo === void 0 ? void 0 : shopLogo.secure_url;
    const result = yield meal_provider_mode_1.default.create(payload);
    return result;
});
exports.mealProviderServes = { CreateMealProviderIntoDB };
