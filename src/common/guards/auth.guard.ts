import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { TelegrafExecutionContext } from 'nestjs-telegraf';
import { Context } from 'telegraf';

import type { PermissionValue } from '@/common/constants/user-permissions';
import { ANY_PERMISSION, REQURIED_PERMISSION } from '@/common/decorators/check-permission.decorator';
import { hasAllPermissions, hasAnyPermission } from '@/common/utils/permission.util';

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = TelegrafExecutionContext.create(context);
    const telegramCtx = ctx.getContext<Context>();

    const user = telegramCtx.user;
    if (!user.isActive) return false;

    const userPermissions = user.permissions;
    if (!userPermissions.length) return false;

    const contextHandler = context.getHandler();
    const contextClass = context.getClass();

    const requiredPermissions =
      this.reflector.getAllAndOverride<PermissionValue[]>(REQURIED_PERMISSION, [contextHandler, contextClass]) ?? [];
    if (requiredPermissions.length) {
      const hasAll = hasAllPermissions(userPermissions, requiredPermissions);
      return hasAll;
    }

    const anyPermissions = this.reflector.getAllAndOverride<PermissionValue[]>(ANY_PERMISSION, [contextHandler, contextClass]) ?? [];
    if (anyPermissions.length) {
      const hasAny = hasAnyPermission(userPermissions, anyPermissions);
      return hasAny;
    }

    return true;
  }
}

export default AuthGuard;
