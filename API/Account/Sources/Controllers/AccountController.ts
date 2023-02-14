import { errorManager } from '@/Errors/ErrorManager';
import { RegisterBody, LoginBody } from '@/Controllers/Validator';
import { ILoginDTO, IRegisterDTO } from '@/DTO/UseCases/';
import { RegisterUseCases, LoginUseCases, LogoutUseCases } from '@/UseCases/index';

import { Request, Response } from 'express';
import { validateOrReject } from 'class-validator';
import * as process from 'process';

export class AccountController {
    public async register (req: Request, res: Response): Promise<void> {
        try {
            const registerBody: RegisterBody = new RegisterBody(req.body);
            await validateOrReject(registerBody);
            const registerDTO: Partial<IRegisterDTO> = { ...registerBody };
            const registerUseCases: RegisterUseCases = new RegisterUseCases();
            await registerUseCases.execute(registerDTO);
            res.status(200).send({
                code: 200,
                message: 'User has been created',
            });
        } catch (e) {
            errorManager(e, res);
        }
    }

    public async login (req: Request, res: Response): Promise<void> {
        try {
            const loginBody: LoginBody = new LoginBody(req.body);
            await validateOrReject(loginBody);
            const loginDTO: Partial<ILoginDTO> = { ...req.body };
            const loginUseCases: LoginUseCases = new LoginUseCases();
            res.cookie('token', await loginUseCases.execute(loginDTO), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60,
                sameSite: 'strict',
            });
            res.status(200)
                .send({
                    code: 200,
                    message: 'User has been logged',
                });
        } catch (e) {
            errorManager(e, res);
        }
    }

    public async logout (req: Request, res: Response) {
        try {
            const logoutUseCases: LogoutUseCases = new LogoutUseCases();
            await logoutUseCases.execute(req.body.token);
            res.status(200).send({
                code: 200,
                content: 'User has been logged out',
            });
        } catch (e) {
            errorManager(e, res);
        }
    }
}
