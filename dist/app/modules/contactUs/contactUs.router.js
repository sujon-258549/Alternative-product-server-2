"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRouter = void 0;
const express_1 = require("express");
const contactUs_controller_1 = require("./contactUs.controller");
const auth_1 = __importDefault(require("../utility/auth"));
const router = (0, express_1.Router)();
router.post('/create-contact', (0, auth_1.default)('user'), contactUs_controller_1.contactController.createContact);
router.get('/c2', (0, auth_1.default)('user'), contactUs_controller_1.contactController.contactForMe2);
router.get('/contactForMe/:id', (0, auth_1.default)('user'), contactUs_controller_1.contactController.contactForMe);
router.get('/contactForHe/:id', (0, auth_1.default)('user'), contactUs_controller_1.contactController.contactForHe);
router.get('/', (0, auth_1.default)('user'), contactUs_controller_1.contactController.singleContact);
router.delete('/:id', (0, auth_1.default)('user'), contactUs_controller_1.contactController.deleteContact);
exports.contactRouter = router;
