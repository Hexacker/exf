/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const SignupController = () => import('#controllers/auth/signup_controller')
const VerifyController = () => import('#controllers/auth/verify_controller')
const SigninController = () => import('#controllers/auth/signin_controller')
const SignoutController = () => import('#controllers/auth/signouts_controller')
const resetPasswordController = () => import('#controllers/auth/reset_password_controller')

router.on('/').render('pages/home')

router
  .group(() => {
    router.get('/signup', [SignupController, 'view']).as('register.show').use(middleware.guest())
    router.post('/signup', [SignupController, 'store']).as('register.store').use(middleware.guest())
    router.get('verify', [VerifyController, 'handle']).as('verify').use(middleware.guest())
    router.get('/signin', [SigninController, 'view']).as('signin.show').use(middleware.guest())
    router.post('/signin', [SigninController, 'store']).as('signin.store').use(middleware.guest())
    router.post('signout', [SignoutController, 'handle']).as('signout').use(middleware.auth())
    router.on('/dashboard').render('pages/auth/welcome').as('dashboard').use(middleware.auth())
    // router
    //   .get('/reset', [resetPasswordController, 'view'])
    //   .as('resetPassword.show')
    //   .use(middleware.guest())
    // router
    //   .post('/reset', [resetPasswordController, 'store'])
    //   .as('resetPassword.store')
    //   .use(middleware.guest())
    // router
    //   .get('/password/:token', [resetPasswordController, 'resetView'])
    //   .as('password.resetView')
    //   .use(middleware.guest())

    // router
    //   .post('/password/:token', [resetPasswordController, 'handle'])
    //   .as('password')
    //   .use(middleware.guest())
  })
  .prefix('/auth')
  .as('auth')
