import { BaseSchema } from '@adonisjs/lucid/schema'
import Roles from '#enums/roles'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().primary()
      table.string('first_name').nullable()
      table.string('last_name').nullable()
      table.string('sex').nullable()
      table.date('birth_date').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.boolean('is_active').notNullable().defaultTo(false)
      table.boolean('is_verified').notNullable().defaultTo(false)
      table.string('phone_number').nullable()
      table.string('job_title').nullable()
      table
        .enu('status', ['pending', 'new', 'trusted', 'review', 'blocked'])
        .notNullable()
        .defaultTo('pending')
      table.enu('role', ['admin', 'user']).notNullable().defaultTo(Roles.USER)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
