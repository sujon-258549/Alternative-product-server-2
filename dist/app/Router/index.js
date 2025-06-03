"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_router_1 = require("../modules/Auth/simpleAuth/register.router");
const product_router_1 = require("../modules/product/product.router");
const recommendation_router_1 = require("../modules/recommendation/recommendation.router");
const contactUs_router_1 = require("../modules/contactUs/contactUs.router");
const router = (0, express_1.Router)();
const allRouter = [
    {
        path: '/auth',
        router: register_router_1.userRouter,
    },
    {
        path: '/product',
        router: product_router_1.product,
    },
    {
        path: '/recommendation',
        router: recommendation_router_1.recommendation,
    },
    {
        path: '/contact',
        router: contactUs_router_1.contactRouter,
    },
];
allRouter.forEach((route) => router.use(route.path, route.router));
exports.default = router;
