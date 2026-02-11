import { SetMetadata } from '@nestjs/common';

import { PermissionValue } from '../constants/user-permissions';

const REQURIED_PERMISSION = 'REQUIRED_PERMISSION';
const ANY_PERMISSION = 'ANY_PERMISSION';

const CheckPermission = (...permissions: PermissionValue[]) => SetMetadata(REQURIED_PERMISSION, permissions);

const CheckAnyPermission = (...permissions: PermissionValue[]) => SetMetadata(ANY_PERMISSION, permissions);

export { REQURIED_PERMISSION, ANY_PERMISSION, CheckPermission, CheckAnyPermission };
