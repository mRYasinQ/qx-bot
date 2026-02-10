import type { PermissionValue } from '../constants/user-permissions';

const hasAnyPermission = (userPermission: PermissionValue[], requiredPermissions: PermissionValue[]): boolean => {
  return requiredPermissions.some((perm) => userPermission.includes(perm));
};

const hasAllPermissions = (userPermission: PermissionValue[], requiredPermissions: PermissionValue[]): boolean => {
  return requiredPermissions.every((perm) => userPermission.includes(perm));
};

export { hasAnyPermission, hasAllPermissions };
