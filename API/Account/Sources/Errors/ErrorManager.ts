import { ErrorEntity } from './ErrorEntity';
import { Response } from 'express';

export function errorManager(error: unknown, res: Response) {
    if (error instanceof ErrorEntity) {
        res.status(error.getCode()).send({
            code: error.getCode(),
            content: error.getMessage()
        });
    } else if (Array.isArray(error)) {
        res.status(400).send({
            code: 400,
            content: error.map(e => {
                return {
                    property: e.property,
                    constraints: e.constraints
                };
            })
        });
    } else {
        res.status(500).send({
            code: 500,
            content: 'Internal Server Error'
        });
    }
}
