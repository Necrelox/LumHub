import { AbstractModels } from './AbstractModels';
import { IUserRoleDTO, IUserRoleFkRoleFkRolePermissionFkPermissionDTO } from '@/DTO/Models/';
import { ErrorEntity, MessageError } from '@/Errors/ErrorEntity';
import { ErrorDatabase } from '@/Database/KnexDatatable';

export class UserRoleModel extends AbstractModels<IUserRoleDTO>{
    constructor() {
        super('user_role');
    }

    public async getFkRoleFkRolePermissionFkPermission(
        entityToSearch: Partial<IUserRoleFkRoleFkRolePermissionFkPermissionDTO>,
        columnToSelect: Partial<Record<keyof IUserRoleFkRoleFkRolePermissionFkPermissionDTO, boolean | string>>)
        : Promise<IUserRoleFkRoleFkRolePermissionFkPermissionDTO[]> {

        return this.knex.select(this.transformColumnsToArray(columnToSelect))
            .leftJoin('role', 'role.id', 'user_role.roleId')
            .leftJoin('role_permission', 'role.id', 'role_permission.roleId')
            .leftJoin('permission', 'permission.id', 'role_permission.permissionId')
            .from(this.tableName)
            .where(entityToSearch)
            .groupBy('user_role.id', 'role.id', 'role_permission.id', 'permission.id')
            .then((result: IUserRoleFkRoleFkRolePermissionFkPermissionDTO[]) => {
                if (result.length === 0)
                    throw new ErrorEntity(MessageError.MODEL_NOT_FOUND);
                return result;
            })
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err.detail);
            });
    }
}
