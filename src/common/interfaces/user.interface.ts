import UserEntity from '@/modules/user/user.entity';

interface User extends UserEntity {
  isNewUser: boolean;
}

export default User;
