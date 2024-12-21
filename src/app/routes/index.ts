import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { adminRoutes } from '../modules/admin/admin.route';
import { blogRoutes } from '../modules/blog/blog.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/admin',
    route: adminRoutes,
  },
  {
    path: '/blogs',
    route: blogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
