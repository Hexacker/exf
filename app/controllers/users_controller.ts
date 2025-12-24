import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  async view({ view, auth }: HttpContext) {
    const user = auth.user
    if (!user) {
      return view.render('pages')
    }
    return view.render('pages')
  }

  async store({ request, response }: HttpContext) {
    const user = await User.create(request.body())
    response.redirect('/users')
  }
}
