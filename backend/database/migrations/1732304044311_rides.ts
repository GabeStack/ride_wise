import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rides'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') 
      table.string('customer_id').notNullable() 
      table.string('origin').notNullable() 
      table.string('destination').notNullable() 
      table.float('distance').notNullable() 
      table.string('duration').notNullable() 
      table.integer('driver_id').unsigned().notNullable() 
      table.string('driver_name').notNullable() 
      table.float('value').notNullable() 
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()) 
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now()) 
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
