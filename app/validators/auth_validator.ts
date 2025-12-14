import vine from '@vinejs/vine'

export const userSignupValidator = vine.compile(
  vine.object({
    first_name: vine.string().trim().minLength(3),
    last_name: vine.string().trim().minLength(2),
    email: vine.string().trim().email().unique({ table: 'users', column: 'email' }),
    password: vine.string().minLength(8),
  })
)

export const userLoginValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim(),
    password: vine.string(),
    isRememberMe: vine.accepted().optional(),
  })
)
