import envSchema from '@/common/schemas/env.schema';

const AppConfig = () => {
  const env = envSchema.parse(process.env);

  return {
    node_env: env.NODE_ENV,
    app: {
      port: env.APP_PORT,
    },
    bot: {
      token: env.BOT_TOKEN,
      proxy: env.BOT_PROXY,
    },
    db: {
      name: env.DB_NAME,
    },
  };
};

export default AppConfig;
