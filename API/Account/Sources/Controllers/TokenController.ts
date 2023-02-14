import { Request, Response } from 'express';
import { errorManager } from '@/Errors/ErrorManager';

export class TokenController {
    public async verifyToken(_req: Request, res: Response): Promise<void> {
        try {
            res.status(200).send({
                code: 200,
                content: 'Token is valid',
            });
        } catch (e) {
            errorManager(e, res);
        }
    }
}
