import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('production'),
  APP_PORT: z.coerce.number().default(3000),

  BOT_TOKEN: z.string().min(1),
  BOT_PROXY: z.string().nullable().default(null),
});

type EnvConfig = z.infer<typeof envSchema>;

export type { EnvConfig };
export default envSchema;
