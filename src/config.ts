import 'dotenv/config';
import * as v from 'valibot';

const configSchema = v.object({
  NODE_ENV: v.picklist(['development', 'production']),
  LOG_LEVEL: v.optional(v.picklist(['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent']), 'info'),
  BOT_TOKEN: v.string(),
  ADMINS: v.array(v.number()),
  DEVS: v.array(v.number()),
});

const parseConfig = () => {
  const env = {
    ...process.env,
    ...{
      ADMINS: JSON.parse(process.env.ADMINS!),
      DEVS: JSON.parse(process.env.DEVS!),
    },
  };

  const config = v.parse(configSchema, env);

  return {
    ...config,
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
  };
};

export type Config = ReturnType<typeof parseConfig>;

export const config = parseConfig();
