import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Review from 'App/Models/Review'

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public vehicle: string

  @column({ columnName: 'rate_per_km' })
  public ratePerKm: number

  @column({ columnName: 'min_km' })
  public minKm: number

  // Relacionamento com Review (hasMany)
  @hasMany(() => Review, {
    foreignKey: 'driver_id', // Chave estrangeira usada no modelo Review
  })
  public reviews: HasMany<typeof Review>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
