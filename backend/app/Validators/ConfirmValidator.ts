import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConfirmValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public static schema = schema.create({
    customer_id: schema.string({ trim: true }, [rules.required()]),
    origin: schema.string({ trim: true }, [rules.required()]),
    destination: schema.string({ trim: true }, [rules.required()]),
    distance: schema.number([rules.required()]),
    duration: schema.string({ trim: true }, [rules.required()]),
    driver: schema.object().members({
      id: schema.number([rules.required()]),
      name: schema.string({ trim: true }, [rules.required()]),
    }),
    value: schema.number([rules.required()]),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public static messages: CustomMessages = {}
}
