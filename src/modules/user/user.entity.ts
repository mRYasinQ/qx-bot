import { Collection, Entity, Enum, ManyToOne, OneToMany, Opt, PrimaryKey, Property } from '@mikro-orm/core';

import PaymentMode from '@/common/constants/payment-mode';
import type { PermissionValue } from '@/common/constants/user-permissions';

@Entity({ tableName: 'users' })
class UserEntity {
  @PrimaryKey()
  id: number;

  @Property({ columnType: 'string', unique: true })
  tgId: string;

  @Property({ columnType: 'varchar', length: 100, nullable: true })
  nickname: string | null = null;

  @Property({ columnType: 'integer', default: 0 })
  balance: number & Opt = 0;

  @Property({ columnType: 'integer', default: 0 })
  debt: number & Opt = 0;

  @Property({ columnType: 'integer', nullable: true })
  debtLimit: number | null = null;

  @Enum({ items: () => PaymentMode, default: PaymentMode.BALANCE })
  paymentMode: PaymentMode & Opt = PaymentMode.BALANCE;

  @Property({ columnType: 'json', type: 'json', default: [] })
  permissions: PermissionValue[] & Opt = [];

  @ManyToOne({
    entity: () => UserEntity,
    fieldName: 'invited_by',
    columnType: 'integer',
    nullable: true,
    joinColumn: 'id',
    deleteRule: 'set null',
  })
  invitedBy: UserEntity | null = null;

  @OneToMany({
    entity: () => UserEntity,
    mappedBy: (user: UserEntity) => user.invitedBy,
  })
  invitedUsers = new Collection<UserEntity>(this);

  @Property({ columnType: 'boolean', default: true })
  isActive: boolean & Opt = true;

  @Property({ columnType: 'boolean', default: false })
  skipForceJoin: boolean & Opt = false;

  @Property({ columnType: 'boolean', default: false })
  isBlocked: boolean & Opt = false;

  @Property()
  joinedAt: Date & Opt = new Date();
}

export default UserEntity;
