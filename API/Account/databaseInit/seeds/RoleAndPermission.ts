import { Knex } from 'knex';

const RolesPermissions = {
    roles: [
        'admin',
        'user'
    ],
    permissions: [
        'admin',
        'account',
        'account.read',
        'account.update'
    ],
    rolePermission: {
        admin: [
            'admin'
        ],
        user: [
            'account.read',
            'account.update'
        ]
    }
};

interface IRole {
    role: string,
    id: number
}

interface IPermission {
    permission: string,
    id: number
}

interface IRolePermission {
    roleId: number,
    permissionId: number
}

export async function seed(knex: Knex): Promise<void> {
    try {
        await knex.transaction(async (trx) => {
            const roles: IRole[] = [];
            for (let i = 0; i < RolesPermissions.roles.length; ++i) {
                roles.push({
                    role: RolesPermissions.roles[i] as string,
                    id: i + 1,
                });
            }
            const permissions: IPermission[] = [];

            for (let i = 0; i < RolesPermissions.permissions.length; ++i) {
                permissions.push({
                    permission: RolesPermissions.permissions[i] as string,
                    id: i + 1,
                });
            }
            await knex.insert(roles).into('role').transacting(trx);
            await knex.insert(permissions).into('permission').transacting(trx);

            const rolesId = await knex.select().from('role').transacting(trx);
            const permissionsId = await knex.select().from('permission').transacting(trx);

            for (const role of roles) {
                if (RolesPermissions.rolePermission[role.role]) {
                    const rolePermission: IRolePermission[] = [];
                    for (const permission of RolesPermissions.rolePermission[role.role]) {

                        const roleId = rolesId.find((r) => r.role === role.role).id;
                        const permissionId = permissionsId.find((m) => m.permission === permission).id;

                        rolePermission.push({
                            roleId: roleId as number,
                            permissionId: permissionId as number
                        });
                    }
                    await knex.insert(rolePermission).into('role_permission').transacting(trx);
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}
