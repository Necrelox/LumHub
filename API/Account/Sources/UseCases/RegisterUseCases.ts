import { IRegisterDTO } from '@/DTO/UseCases';
import { IUserDTO } from '@/DTO/Models';
import { Password, Mailer } from '@/Services/index';
import { UseCreationTransaction } from '@/Repositories/Database/Transactions';
import * as process from 'process';
import fs from 'fs';

export class RegisterUseCases {
    public async execute(registerDTO: Partial<IRegisterDTO>): Promise<void> {
        const hashedPassword: Buffer = new Password().hashPassword(registerDTO.password as string);
        const userDto: Partial<IUserDTO> = Object.assign({}, registerDTO, { password: hashedPassword });
        await Promise.all([
            (new UseCreationTransaction()).execute(userDto),
            (new Mailer()).sendMail({
                from: process.env.MAILER_USER as string,
                to: registerDTO.email as string,
                subject: 'Bienvenue sur LumHub',
                html: (await fs.promises.readFile(__dirname + '/../Assets/Template/MailUserCreated.html' as string, 'utf8')).replace('[USERNAME]', registerDTO.username as string)
            })
        ]);
    }
}
