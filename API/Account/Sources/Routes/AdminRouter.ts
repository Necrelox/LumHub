import { AdminController } from '@/Controllers/index';
import { AbstractRouter } from '@/Routes/AbstractRouter';

export class AdminRouter extends AbstractRouter<AdminController> {
    constructor() {
        super(new AdminController());
    }

    protected initRoutes(): void {
        console.log('AdminRouter.initRoutes()');
    }
}
