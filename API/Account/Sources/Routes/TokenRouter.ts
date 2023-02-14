import { TokenController } from '@/Controllers/index';
import { AbstractRouter } from '@/Routes/AbstractRouter';
import { tokenChecker } from '@/Middlewares/TokenChecker';

export class TokenRouter extends AbstractRouter<TokenController> {
    constructor() {
        super(new TokenController());
    }

    protected initRoutes(): void {
        this.router.get('/verify', tokenChecker, this.controller.verifyToken);
    }
}
