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
exports.upload = exports.sendImageCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const sendImageCloudinary = (name, path) => {
    return new Promise((resolve, reject) => {
        (function () {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    // Configuration
                    cloudinary_1.v2.config({
                        cloud_name: 'dkdibsanz',
                        api_key: '558721645753651',
                        api_secret: 'Ky5Ga3DuiaRU77goqQem_bEdWQU',
                    });
                    // Upload an image
                    const uploadResult = yield cloudinary_1.v2.uploader.upload(path, {
                        public_id: name,
                    });
                    fs_1.default.unlink(path, (err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            console.log('file is deleted');
                        }
                    });
                    // Optional: log optimized URLs
                    const optimizeUrl = cloudinary_1.v2.url(name, {
                        fetch_format: 'auto',
                        quality: 'auto',
                    });
                    console.log('Optimized URL:', optimizeUrl);
                    const autoCropUrl = cloudinary_1.v2.url(name, {
                        crop: 'auto',
                        gravity: 'auto',
                        width: 500,
                        height: 500,
                    });
                    console.log('Auto Crop URL:', autoCropUrl);
                    resolve(uploadResult);
                }
                catch (error) {
                    reject(error);
                }
            });
        })();
    });
};
exports.sendImageCloudinary = sendImageCloudinary;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
