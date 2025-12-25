import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const UpdateUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(1).maxLength(100),
    lastName: vine.string().trim().minLength(1).maxLength(100),
    email: vine.string().trim().email(),
    sex: vine.string(),
    birthdate: vine.string(),
    phoneNumber: vine.string().optional(),
    jobTitle: vine.string().optional(),
  })
)

export const AddUserBirthdateValidator = vine.object({
  birthdate: vine.date().beforeOrEqual(() => {
    return DateTime.now().minus({ years: 18 }).toISODate()
  }),
})
