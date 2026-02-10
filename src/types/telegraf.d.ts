import type User from '@/common/interfaces/user.interface';

declare module 'telegraf' {
  interface Context {
    user: User;
  }
}
