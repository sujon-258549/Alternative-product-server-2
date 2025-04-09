"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_router_1 = require("../modules/Auth/simpleAuth/register.router");
const restaurant_router_1 = require("../modules/Restaurant/restaurant.router");
const order_router_1 = require("../modules/Order/order.router");
const meal_provider_router_1 = require("../modules/mealProvider/meal.provider.router");
const sosolauth_router_1 = require("../modules/Auth/sosalAuth/sosolauth.router");
const sslCommeriz_router_1 = require("../modules/sslCommeriz/sslCommeriz.router");
const router = (0, express_1.Router)();
const allRouter = [
    {
        path: '/auth',
        router: register_router_1.userRouter,
    },
    {
        path: '/restaurant',
        router: restaurant_router_1.restaurantRouter,
    },
    {
        path: '/order',
        router: order_router_1.orderRouter,
    },
    {
        path: '/meal-provider',
        router: meal_provider_router_1.mealProviderRouter,
    },
    {
        path: '/sosal',
        router: sosolauth_router_1.sosalLoginUserRouter,
    },
    {
        path: '/ssl',
        router: sslCommeriz_router_1.SSLRoutes,
    },
];
allRouter.forEach((route) => router.use(route.path, route.router));
exports.default = router;
