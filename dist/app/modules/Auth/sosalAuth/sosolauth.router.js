"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sosalLoginUserRouter = void 0;
const express_1 = require("express");
const sosalauth_controller_1 = require("./sosalauth.controller");
const router = (0, express_1.Router)();
router.post('/login-sosal-user', sosalauth_controller_1.sosalAuthController.createAuthLogin);
exports.sosalLoginUserRouter = router;
