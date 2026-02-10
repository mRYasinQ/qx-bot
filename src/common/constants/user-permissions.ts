const PERMISSION_LIST = [
  {
    id: 1,
    title: 'مشاهده پنل',
    value: 'display_admin',
  },
  {
    id: 2,
    title: 'مدیریت کاربران',
    value: 'manage_users',
  },
  {
    id: 3,
    title: 'اطلاع‌رسانی هوشمند',
    value: 'important_notifications',
  },
] as const;

type PermissionValue = (typeof PERMISSION_LIST)[number]['value'];
type PermissionsType = { [K in PermissionValue as Uppercase<K>]: K };

const PERMISSIONS = Object.freeze(Object.fromEntries(PERMISSION_LIST.map((p) => [p.value.toUpperCase(), p.value]))) as PermissionsType;

export type { PermissionValue };
export { PERMISSION_LIST };
export default PERMISSIONS;
