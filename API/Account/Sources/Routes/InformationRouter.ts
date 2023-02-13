import { InformationController } from '@/Controllers/index';
import { AbstractRouter } from '@/Routes/AbstractRouter';

export class InformationRouter extends AbstractRouter<InformationController> {
    constructor() {
        super(new InformationController());
    }

    protected initRoutes(): void {
        this.router.route('/me')
            .get()
            .put();
        this.router.route('/devices')
            .get()
            .post()
            .put()
            .delete();
        this.router.get('/devices/:id');
        this.router.route('/logo')
            .get()
            .post()
            .delete();
    }
}
