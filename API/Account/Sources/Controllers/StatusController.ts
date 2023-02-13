import { Request, Response } from 'express';

export class StatusController {

    public async health(_req: Request, res: Response): Promise<void> {
        res.status(200).json({
            code: 200,
            message: 'OK',
        });
    }
}
