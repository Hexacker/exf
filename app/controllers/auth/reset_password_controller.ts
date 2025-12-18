import User from '#models/user'
import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'

export default class ResetPasswordsController {
  async view(ctx: HttpContext) {
    return ctx.view.render('pages/auth/resetPasswordReq')
  }

  async store({ request, response }: HttpContext) {
    const { email } = request.only(['email'])
    const findUser = await User.findBy('email', email)
    if (findUser && findUser.isActive) {
      const secret = env.get('VERIFICATION_TOKEN') as string

      const passwordResetToken = jwt.sign({ email: findUser.email }, `${secret}`, {
        expiresIn: `${env.get('VERIFICATION_TOKEN_EXPIRATION')}h`,
      })

      if (passwordResetToken) {
        const url = `${env.get('URL')}/auth/password/${passwordResetToken}`
        // THE URL MUST BE SENT BY EMAIL
        console.log('URL ==> ', url)
        response.redirect().back()
      } else {
        console.log('issue while creating password reset link')
      }
    } else {
      console.log('could not find user or user is not active')
    }
  }

  async resetView({ view, request }: HttpContext) {
    return view.render('pages/auth/resetPassword', { token: request.param('token') })
  }

  async handle({ request, response, auth, session }: HttpContext) {
    const token = request.param('token')
    const secret = env.get('VERIFICATION_TOKEN')

    if (!secret) {
      throw new Error('Missing JWT verification secret')
    }

    try {
      const verifyToken = jwt.verify(token, secret) as { email: string }

      if (verifyToken) {
        const findUser = await User.findBy({ email: verifyToken.email })
        if (findUser && findUser.email) {
          const { password, confirmPassword } = request.only(['password', 'confirmPassword'])
          if (password === confirmPassword) {
            findUser.password = password
            await findUser.save()
            auth.use('web').login(findUser)
            response.redirect().toRoute('/')
          } else {
            session.flash({
              notification: {
                type: 'error',
                message: 'Make sure you enter the same password',
              },
            })
            response.redirect().back()
          }
        } else {
          session.flash({
            notification: {
              type: 'error',
              message: 'There is no user with this email',
            },
          })
          response.redirect().back()
        }
      } else {
        session.flash({
          notification: {
            type: 'error',
            message: 'Invalid password reset token',
          },
        })
        response.redirect().back()
      }
    } catch (error) {
      session.flash({
        notification: {
          type: 'error',
          message: 'Invalid or expired password reset token',
        },
      })
      response.redirect().back()
    }
  }
}
