import { IRegisterDTO } from '@/DTO/UseCases';
import { IUserDTO } from '@/DTO/Models';
import { Password } from '@/Services/index';
import { UseCreationTransaction } from '@/Repositories/Database/Transactions';

export class RegisterUseCases {
    public async execute(registerDTO: Partial<IRegisterDTO>): Promise<void> {
        const hashedPassword: Buffer = new Password().hashPassword(registerDTO.password as string);
        const userDto: Partial<IUserDTO> = Object.assign({}, registerDTO, { password: hashedPassword });
        await (new UseCreationTransaction()).execute(userDto);
    }
}
