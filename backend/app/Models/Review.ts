import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Driver from 'App/Models/Driver'

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public rating: number

  @column()
  public comment: string

  // Chave estrangeira para o modelo Driver
  @column()
  public driver_id: number

  // Relacionamento com Driver
  @belongsTo(() => Driver)
  public driver: BelongsTo<typeof Driver>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}