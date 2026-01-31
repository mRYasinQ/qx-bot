declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      APP_PORT: string;
      MAX_LIMIT_PAGINATION: string;

      BOT_TOKEN: string;

      DB_NAME: string;
    }
  }
}

export {};
