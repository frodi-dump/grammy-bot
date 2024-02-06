import 'dotenv/config'
import env from 'env-var'
import * as v from 'valibot'

const configSchema = v.object({
  NODE_ENV: v.picklist(['development', 'production']),
  LOG_LEVEL: v.optional(
    v.picklist(['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent']),
    'info',
  ),
  BOT_TOKEN: v.string(),
  ADMINS: v.array(v.number()),
  DEVS: v.array(v.number()),
})

const Env = {
  NODE_ENV: env.get('NODE_ENV').required().asString(),
  ADMINS: env.get('ADMINS').required().asJsonArray() as number[],
  DEVS: env.get('DEVS').required().asJsonArray() as number[],
  LOG_LEVEL: env.get('LOG_LEVEL').required().asString(),
  BOT_TOKEN: env.get('BOT_TOKEN').required().asString(),
}

const parseConfig = () => {
  const config = v.parse(configSchema, Env)

  return {
    ...config,
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
  }
}

export type Config = ReturnType<typeof parseConfig>

export const config = parseConfig()
