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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sosalAuthServices = void 0;
const sosalauth_model_1 = require("./sosalauth.model");
const createSosalUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const existEmail = yield sosalauth_model_1.SosalAuth.findOne({
        email: payload === null || payload === void 0 ? void 0 : payload.email,
    });
    if (existEmail) {
        console.log('email already exist');
    }
    const result = yield sosalauth_model_1.SosalAuth.create(payload);
    return result;
});
// const findMyMenuForDayIntoDB = async (
//   user: JwtPayload,
//   query: Record<string, unknown>,
// ) => {
//   //   const result = await Restaurant.find({ id: user.author_id });
//   const restorenet = new queryBuilder(Restaurant.find(), query);
//   const meta = await restorenet.countTotal();
//   const data = await restorenet.modelQuery;
//   return { meta, data };
// };
exports.sosalAuthServices = {
    createSosalUserIntoDB,
};
