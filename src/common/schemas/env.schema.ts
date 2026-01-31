import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('production'),
  APP_PORT: z.coerce.number().default(3000),
  MAX_LIMIT_PAGINATION: z.coerce.number().default(5),

  BOT_TOKEN: z.string().min(1),

  DB_NAME: z.string().default('bot.db'),
});

type EnvConfig = z.infer<typeof envSchema>;

export type { EnvConfig };
export default envSchema;
