export interface IUserRoleFkRoleFkRolePermissionFkPermissionDTO {
    'user_role.userUuid': string;
    'user_role.roleId': number;
    'user_role.id': number;
    'role.role': string;
    'role.createdAt': Date;
    'role.id': number;
    'role_permission.roleId': number;
    'role_permission.permissionId': number;
    'role_permission.id': number;
    'permission.permission': string;
    'permission.createdAt': Date;
    'permission.id': number;
}
