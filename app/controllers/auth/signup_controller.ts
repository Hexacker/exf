import type { HttpContext } from '@adonisjs/core/http'
// import CacheService from '#services/cache_service'
import { inject } from '@adonisjs/core'
import User from '#models/user'
import env from '#start/env'
import { userSignupValidator } from '#validators/auth_validator'
//import generateRandomAlphanumericShort from '#helpers/random_code'
import mail from '@adonisjs/mail/services/main'
import jwt from 'jsonwebtoken'

@inject()
export default class SignupController {
  // constructor(private cacheService: CacheService) {}

  async view({ view }: HttpContext) {
    return view.render('pages/auth/signup')
  }

  async store({ request, response, session }: HttpContext) {
    // const getAllUsers = await User.all()
    // if (getAllUsers.length === 0) {
    //   await User.create(await request.validateUsing(userSignupValidator))
    // }

    //const userCode = generateRandomAlphanumericShort(6)
    const payload = await request.validateUsing(userSignupValidator)

    const userCreation = await User.create(payload)
    const secret = env.get('VERIFICATION_TOKEN')

    const verificationToken = jwt.sign({ email: userCreation.email }, `${secret}`, {
      expiresIn: `${env.get('VERIFICATION_TOKEN_EXPIRATION')}h`,
    })
    const url = `${env.get('URL')}/auth/verify?token=${verificationToken}`
    console.log(url)
    try {
      await mail.send((message) => {
        message
          .to(`${userCreation.email}`)
          .subject('Verify your email address')
          .text(`Please verify your email address by clicking on the following link: ${url}`)
      })
      session.flash('success', 'Email has been sent')
    } catch (error) {
      console.error(error)
    }
    return response.redirect().toPath('/')
    //return response.status(201).json({ message: 'User created successfully' })
  }
}
