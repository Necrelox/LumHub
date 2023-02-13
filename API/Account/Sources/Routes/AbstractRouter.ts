import { Router } from 'express';

export abstract class AbstractRouter<T> {
    protected readonly router: Router;
    protected controller: T;

    protected constructor(controller: T) {
        this.router = Router();
        this.controller = controller;
        this.initRoutes();
    }

    protected abstract initRoutes(): void;

    public getRouter(): Router {
        return this.router;
    }
}
