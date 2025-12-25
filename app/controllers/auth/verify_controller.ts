import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import env from '#start/env'
import jwt from 'jsonwebtoken'

export default class VerifiesController {
  constructor() {}

  async handle({ request, response }: HttpContext) {
    const { token } = request.qs()
    const verifyToken: any = jwt.verify(token, env.get('VERIFICATION_TOKEN'))
    if (verifyToken) {
      const findUser = await User.findByOrFail({ email: verifyToken.email })
      if (findUser && findUser.email) {
        findUser.isVerified = true
        findUser.isActive = true
        await findUser.save()
      }
      return response.redirect().toRoute('auth.signin.show')
    } else {
      return response.badRequest('Failed')

      //return response.status(201).json({ message: 'User created successfully' });
    }
  }
}
