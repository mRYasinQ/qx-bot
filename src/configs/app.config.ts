import envSchema from '@/common/schemas/env.schema';

const AppConfig = () => {
  const env = envSchema.parse(process.env);

  const config = {
    node_env: env.NODE_ENV,
    app: {
      port: env.APP_PORT,
      max_limit_pagination: env.MAX_LIMIT_PAGINATION,
    },
    bot: {
      token: env.BOT_TOKEN,
    },
    db: {
      name: env.DB_NAME,
    },
  };

  return config;
};

export default AppConfig;
