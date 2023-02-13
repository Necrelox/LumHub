import { AbstractModels } from './AbstractModels';
import { IUserTokenFkUserDTO, IUserTokenDTO } from '@/DTO/Models/';
import { ErrorEntity, MessageError } from '@/Errors/ErrorEntity';
import { ErrorDatabase } from '@/Database/KnexDatatable';

export class UserTokenModel extends AbstractModels<IUserTokenDTO>{
    constructor() {
        super('user_token');
    }

    public async getFkUser(
        entityToSearch: Partial<IUserTokenFkUserDTO>,
        columnToSelect: Partial<Record<keyof IUserTokenFkUserDTO, boolean | string>>)
    : Promise<IUserTokenFkUserDTO[]> {
        return this.knex.select(this.transformColumnsToArray(columnToSelect))
            .from(this.tableName)
            .leftJoin('user', 'user.uuid', 'user_token.userUuid')
            .where(entityToSearch)
            .then((result: IUserTokenFkUserDTO[]) => {
                if (result.length === 0)
                    throw new ErrorEntity(MessageError.MODEL_NOT_FOUND);
                return result;
            })
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err.detail);
            });
    }
}
