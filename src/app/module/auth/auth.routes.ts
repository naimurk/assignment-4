import express from 'express'
import { authController } from './auth.controller'
import checkAuth from '../../middleware/checkAuth'
import { USER_ROLE } from '../../constant/constant'
import validateRequest from '../../middleware/validateRequest'
import { authValidation } from './AuthValidation'


const router = express.Router()

router.post('/register',validateRequest(authValidation.registerValidation), authController.register)
router.post('/login',  validateRequest(authValidation.loginValidation), authController.login)

router.post(
  '/change-password',
  validateRequest(authValidation.changePasswordValidation),
  checkAuth(USER_ROLE.admin, USER_ROLE.user),
  authController.changePassword,
)
// router.post('/refresh-token', authController.refreshToken)

export const authRoutes = router