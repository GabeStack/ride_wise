import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  connection: Env.get('DB_CONNECTION', 'pg'), // Defina o padrão como 'pg' caso a variável não esteja configurada

  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: Env.get('PG_HOST', 'localhost'),
        port: Env.get('PG_PORT', 5432),
        user: Env.get('PG_USER', 'postgres'),
        password: Env.get('PG_PASSWORD', ''),
        database: Env.get('PG_DB_NAME', 'postgres'),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },
  },
}

export default databaseConfig
