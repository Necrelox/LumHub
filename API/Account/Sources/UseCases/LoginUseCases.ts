import { ILoginDTO } from '@/DTO/UseCases';
import { IUserDTO, IUserRoleFkRoleFkRolePermissionFkPermissionDTO } from '@/DTO/Models';
import { IBasicTokenDTO, ISanitizeRoleAndPermissionDTO } from '@/DTO/Services';
import { UserModel, UserRoleModel, UserTokenModel } from '@/Repositories/Database/Models';
import { Password, Token, GroupRoleWithPermissions } from '@/Services/index';

export class LoginUseCases {
    public async execute(loginDTO: Partial<ILoginDTO>): Promise<string> {
        const userDTOtoModel: Partial<IUserDTO> = loginDTO.username ? { username: loginDTO.username } : { email: loginDTO.email };

        const userModel: UserModel = new UserModel();
        const [userDTO]: Pick<IUserDTO, 'uuid' | 'password' | 'username'>[] = await userModel.get(userDTOtoModel, {
            uuid: true,
            password: true,
            username: true,
        });

        const password: Password = new Password();
        password.verifyPassword(loginDTO.password as string, userDTO?.password as Buffer);

        const userRoleWithPermissionDTO: Pick<IUserRoleFkRoleFkRolePermissionFkPermissionDTO, 'role.role' | 'permission.permission'>[] = await (new UserRoleModel()).getFkRoleFkRolePermissionFkPermission({
            'user_role.userUuid': userDTO?.uuid as string,
        }, {
            'role.role': true,
            'permission.permission': true,
        });

        const groupRoleWithPermissions: GroupRoleWithPermissions = new GroupRoleWithPermissions();
        const sanitizeRoleAndPermissionDTO: ISanitizeRoleAndPermissionDTO = groupRoleWithPermissions.execute(userRoleWithPermissionDTO.map((userRoleWithPermissionDTO: Pick<IUserRoleFkRoleFkRolePermissionFkPermissionDTO, 'role.role' | 'permission.permission'>) => {
            return {
                role: userRoleWithPermissionDTO['role'],
                permission: userRoleWithPermissionDTO['permission'],
            };
        }));

        const token: Token = new Token();
        const tokenDTO: IBasicTokenDTO = await token.generateToken({
            username: userDTO?.username as string,
        }, sanitizeRoleAndPermissionDTO
        );

        const userTokenModel: UserTokenModel = new UserTokenModel();
        await userTokenModel.create([{
            token: tokenDTO.token,
            publicKey: tokenDTO.publicKey,
            userUuid: userDTO?.uuid as string,
        }], { token: true });


        await userModel.update({
            isConnected: true,
        }, {
            uuid: userDTO?.uuid as string,
        });

        return tokenDTO.token;
    }
}