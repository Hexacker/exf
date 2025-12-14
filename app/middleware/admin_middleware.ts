// import Roles from '#enums/roles'
// //import { Exception } from '@adonisjs/core/exceptions'
// import type { HttpContext } from '@adonisjs/core/http'
// import type { NextFn } from '@adonisjs/core/types/http'

// export default class AdminMiddleware {
//   async handle(ctx: HttpContext, next: NextFn) {
//     /**
//      * Middleware logic goes here (before the next call)
//      */
//     await ctx.auth.check()
//     const isAdmin = ctx.auth.user?.role === Roles.ADMIN

//     if (!isAdmin) {
//       ctx.session.flash('notification', {
//         type: 'error',
//         message: 'Unauthorized',
//       })
//       // throw new Exception('Unauthorized', {
//       //   code: 'E_NOT_AUTHORIZED',
//       //   status: 401,
//       // })
//     }

//     /**
//      * Call next method in the pipeline and return its output
//      */
//     const output = await next()
//     return output
//   }
// }
