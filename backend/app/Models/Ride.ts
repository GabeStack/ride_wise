import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Ride extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public customer_id: string

  @column()
  public origin: string

  @column()
  public destination: string

  @column()
  public distance: number

  @column()
  public duration: string

  @column()
  public driver_id: number

  @column()
  public driver_name: string

  @column()
  public value: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
