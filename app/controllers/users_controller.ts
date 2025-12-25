import type { HttpContext } from '@adonisjs/core/http'
import { UpdateUserValidator } from '#validators/update_user'
import User from '#models/user'
import { DateTime } from 'luxon'

export default class UsersController {
  async updateView({ view, auth, response, session }: HttpContext) {
    const user = auth.user
    if (!user) {
      session.flash('notification', {
        type: 'error',
        message: 'User not found',
      })
      return response.redirect().toPath('auth.signin.show')
    }
    return view.render('pages/user/update', {
      user: {
        ...user.serialize(),
        birthdate: user.birthdate?.toFormat('yyyy-MM-dd') ?? '',
      },
    })
  }

  async update({ request, response, auth, session }: HttpContext) {
    const user = auth.user
    if (!user) {
      session.flash('notification', {
        type: 'error',
        message: 'User not found',
      })
      return response.redirect().toPath('auth.signin.show')
    }

    // Validate the input using the validator from the validators directory
    const { firstName, lastName, email, sex, birthdate, phoneNumber, jobTitle } =
      await request.validateUsing(UpdateUserValidator)
    // console.log('Validated user data:', {
    //   firstName,
    //   lastName,
    //   email,
    //   sex,
    //   birthdate,
    //   phoneNumber,
    //   jobTitle,
    // })
    const findUser = await User.findBy('id', user.id)
    if (!findUser) {
      session.flash('notification', {
        type: 'error',
        message: 'User not found',
      })
      return response.redirect().toPath('auth.signin.show')
    }

    try {
      // Update user properties
      findUser.firstName = firstName
      findUser.lastName = lastName
      findUser.email = email
      findUser.sex = sex
      findUser.birthdate = DateTime.fromISO(birthdate)
      findUser.phoneNumber = phoneNumber ?? null
      findUser.jobTitle = jobTitle ?? null

      await findUser.save()

      session.flash('notification', {
        type: 'success',
        message: 'User updated successfully',
      })

      return response.redirect().back()
    } catch (error) {
      session.flash('notification', {
        type: 'error',
        message: 'Failed to update user: ' + error.message,
      })
      return response.redirect().back()
    }
  }
}
