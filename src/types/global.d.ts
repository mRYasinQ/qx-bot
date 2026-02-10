declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      APP_PORT: string;

      BOT_TOKEN: string;
      BOT_PROXY: string;
    }
  }
}

export {};
