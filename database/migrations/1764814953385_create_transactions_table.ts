import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().primary()
      table.uuid('sender_balance_ids').references('id').inTable('balances').onDelete('CASCADE')
      table.uuid('receiver_balance_id').references('id').inTable('balances').onDelete('CASCADE')
      table.integer('amount').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
