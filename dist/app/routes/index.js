"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_routes_1 = require("../module/category/category.routes");
const course_routes_1 = require("../module/course/course.routes");
const review_routes_1 = require("../module/review/review.routes");
const user_routes_1 = require("../module/user/user.routes");
const auth_routes_1 = require("../module/auth/auth.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/categories',
        route: category_routes_1.CategoryRoutes,
    },
    {
        path: '/',
        route: course_routes_1.CourseRoutes,
    },
    {
        path: '/',
        route: review_routes_1.ReviewRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.authRoutes,
    },
    {
        path: '/',
        route: user_routes_1.UserRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
