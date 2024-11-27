import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rides'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // ID da viagem
      table.string('customer_id').notNullable() // ID do cliente
      table.string('origin').notNullable() // Origem
      table.string('destination').notNullable() // Destino
      table.float('distance').notNullable() // Distância da viagem
      table.string('duration').notNullable() // Duração da viagem
      table.integer('driver_id').unsigned().notNullable() // ID do motorista
      table.string('driver_name').notNullable() // Nome do motorista
      table.float('value').notNullable() // Valor da viagem
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()) // Timestamp de criação
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now()) // Timestamp de atualização
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
