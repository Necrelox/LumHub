import { Request, Response, NextFunction } from 'express';
import { UserTokenModel } from '@/Repositories/Database/Models';
import { Token } from '@/Services/index';
import { IUserTokenDTO } from '@/DTO/Models';

async function signatureChecker(token: string) {
    const userToken: UserTokenModel = new UserTokenModel();
    const [tokenDTO]: Pick<IUserTokenDTO, 'publicKey'>[] = await userToken.get({
        token,
    }, {
        publicKey: true
    });
    const tokenService: Token = new Token();
    if (!await tokenService.verifyToken(token, tokenDTO?.publicKey as string))
        throw new Error('Token is invalid');
}

async function expirationDateChecker(token: string) {
    const [header]: string[] = token.split('.');
    const { exp } = JSON.parse(Buffer.from(header as string, 'base64').toString('utf-8'));
    if (exp < new Date())
        throw new Error('Token is expired');
}

export async function tokenChecker(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token: string = req.cookies.token;
        await Promise.all([
            signatureChecker(token),
            expirationDateChecker(token),
        ]);
        req.body.token = token;
        next();
    } catch (e) {
        res.status(401).send({
            code: 401,
            content: 'Unauthorized'
        });
    }
}
