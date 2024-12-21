import { Router } from 'express';
import { blogControllers } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidations } from './blog.validation';

const router = Router();

router
  .route('/')
  .post(
    auth(USER_ROLE.user, USER_ROLE.admin),
    validateRequest(blogValidations.blogValidationSchema),
    blogControllers.createBlog,
  );

router
  .route('/:id')
  .patch(
    auth(USER_ROLE.user, USER_ROLE.admin),
    validateRequest(blogValidations.updateBlogValidationSchema),
    blogControllers.updateBlog,
  )
  .delete(auth(USER_ROLE.user, USER_ROLE.admin), blogControllers.deleteBlog);

router.route('/').get(blogControllers.getAllBlogs);

export const blogRoutes = router;
