import { UserTokenModel, UserModel } from '@/Repositories/Database/Models';
import { IUserTokenFkUserDTO } from '@/DTO/Models';

export class LogoutUseCases {
    public async execute(token: string): Promise<void> {
        const userToken: UserTokenModel = new UserTokenModel();
        const [tokenFkUserDTO]: Pick<IUserTokenFkUserDTO, 'userUuid'>[] = await userToken.getFkUser({
            token,
        }, {
            userUuid: true,
        });
        const user: UserModel = new UserModel();
        await Promise.all([
            user.update({
                isConnected: false,
            }, {
                uuid: tokenFkUserDTO?.userUuid,
            }),
            userToken.delete({
                token,
            })
        ]);
    }
}