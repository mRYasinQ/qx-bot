import { Action } from 'nestjs-telegraf';

const OnCallback = (prefix: string) => {
  const regex = new RegExp(`^${prefix}(.+)`);
  return Action(regex);
};

export default OnCallback;
