import { KnexDatatable } from '@/Database/KnexDatatable';
import { IRoleDTO, IUserDTO } from '@/DTO/Models';
import { RoleModel, UserModel, UserRoleModel } from '@/Repositories/Database/Models';

export class UseCreationTransaction {
    private knex = KnexDatatable.getInstance();

    public async execute(userDTO: Partial<IUserDTO>): Promise<void> {
        await this.knex.transaction(async (trx) => {
            const userModel: UserModel = new UserModel();
            const [user]: Pick<IUserDTO, 'uuid'>[] = await userModel.transactionCreate([userDTO], { uuid: true }, trx);
            const roleModel: RoleModel = new RoleModel();
            const [role]: Pick<IRoleDTO, 'id'>[] = await roleModel.transactionGet({ role: 'user' }, { id: true }, trx);
            const userRoleModel: UserRoleModel = new UserRoleModel();
            await userRoleModel.transactionCreate([{ userUuid: user?.uuid, roleId: role?.id }], { id: true }, trx);
        });
    }
}
