import type User from './user.interface';

interface UserRegisterPayload {
  user: User;
  inviterId?: string;
}

interface UserChangeStatusPayload {
  userId: number;
  isBlocked: boolean;
}

export type { UserRegisterPayload, UserChangeStatusPayload };
