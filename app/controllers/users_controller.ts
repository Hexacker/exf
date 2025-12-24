import type { HttpContext } from '@adonisjs/core/http'
//import User from '#models/user'

export default class UsersController {
  async view({ view, auth }: HttpContext) {
    const user = auth.user
    if (!user) {
      return view.render('pages')
    }
    return view.render('pages')
  }

  async store({ response, auth }: HttpContext) {
    const getUser = auth.user?.id
    if (!getUser) {
      return response.status(401).json({ message: 'Unauthorized' })
    }
    //
    response.redirect('/users')
  }
}
