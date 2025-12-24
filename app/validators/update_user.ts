import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const UserValidator = vine.object({
  email: vine.string().email(),
  first_name: vine.string().minLength(2).maxLength(100),
  last_name: vine.string().minLength(2).maxLength(100),
})

export const AddUserBirthdateValidator = vine.object({
  birthdate: vine.date().beforeOrEqual((field) => {
    return DateTime.now().minus({ years: 18 }).toISODate()
  }),
})
