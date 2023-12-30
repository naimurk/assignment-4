import { Router } from "express";
import { CategoryRoutes } from "../module/category/category.routes";
import { CourseRoutes } from "../module/course/course.routes";
import { ReviewRoutes } from "../module/review/review.routes";
import { UserRoutes } from "../module/user/user.routes";
import { authRoutes } from "../module/auth/auth.routes";



const router = Router();

const moduleRoutes = [
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/',
    route: CourseRoutes,
  },
  {
    path: '/',
    route: ReviewRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/',
    route: UserRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;