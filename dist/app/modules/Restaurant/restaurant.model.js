"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const MenuItemSchema = new mongoose_1.Schema({
    menu: { type: String, required: true },
    price: { type: Number, required: true },
});
const MenuSchema = new mongoose_1.Schema({
    day: { type: String, required: true },
    author_id: { type: String, required: true, ref: 'User' },
    morning: { type: MenuItemSchema, required: true },
    evening: { type: MenuItemSchema, required: true },
    night: { type: MenuItemSchema, required: true },
}, { timestamps: true });
exports.Restaurant = mongoose_1.default.model('Menu', MenuSchema);
