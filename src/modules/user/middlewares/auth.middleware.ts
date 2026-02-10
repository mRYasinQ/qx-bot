import { Injectable } from '@nestjs/common';

import { Context, type Middleware } from 'telegraf';

import UserService from '../user.service';

@Injectable()
class AuthMiddleware {
  constructor(private readonly userService: UserService) {}

  use: Middleware<Context> = async (ctx, next) => {
    const from = ctx.from;
    const chat = ctx.chat;

    if (!from || from.is_bot || chat?.type !== 'private') return next();

    const tgId = from.id.toString();
    const user = await this.userService.findOrCreate({ tgId });

    ctx.user = user;

    return next();
  };
}

export default AuthMiddleware;
