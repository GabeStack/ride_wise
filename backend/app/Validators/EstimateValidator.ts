import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";

export default class EstimateValidator {
  // Definir o schema de validação
  public static schema = schema.create({
    customer_id: schema.string({ trim: true }, [rules.required()]),
    origin: schema.string({ trim: true }, [rules.required()]),
    destination: schema.string({ trim: true }, [rules.required()]),
  })

  // Mensagens de erro personalizadas
  public static messages: CustomMessages = {
    'customer_id.required': 'O campo ID do cliente é obrigatório.',
    'origin.required': 'O campo origem é obrigatório.',
    'destination.required': 'O campo destino é obrigatório.',
  }
}
