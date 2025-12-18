import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { userLoginValidator } from '#validators/auth_validator'

export default class SigninsController {
  async view({ view }: HttpContext) {
    return view.render('pages/auth/signin')
  }

  async store({ request, response, auth, session }: HttpContext) {
    const { email, password, isRememberMe } = await request.validateUsing(userLoginValidator)
    console.log(email, password)
    const findUser = await User.findBy('email', email)

    if (findUser) {
      const user = await User.verifyCredentials(email, password)
      if (user) {
        if (user.isActive && user.isVerified) {
          await auth.use('web').login(user, isRememberMe)
          return response.redirect().toPath('/auth/dashboard')
        } else {
          session.flash('notification', {
            type: 'error',
            message: 'Email has not been verified. Verify your email to be able to log in',
          })
          return response.redirect().toRoute('/auth/login')
        }
      } else {
        session.flash('notification', {
          type: 'error',
          message: 'Invalid credentials',
        })
        return response.redirect().toRoute('/auth/login')
      }
    } else {
      session.flash('notification', {
        type: 'error',
        message: 'User not found',
      })
      return response.redirect().toRoute('/auth/login')
    }
  }
}
