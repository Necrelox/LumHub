import { StatusController } from '@/Controllers/index';
import { AbstractRouter } from '@/Routes/AbstractRouter';

export class StatusRouter extends AbstractRouter<StatusController> {
    constructor() {
        super(new StatusController());
    }

    protected initRoutes(): void {
        this.router.get('/health', this.controller.health);
    }
}
