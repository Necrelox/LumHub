import { TokenController } from '@/Controllers/index';
import { AbstractRouter } from '@/Routes/AbstractRouter';

export class TokenRouter extends AbstractRouter<TokenController> {
    constructor() {
        super(new TokenController());
    }

    protected initRoutes(): void {
        this.router.post('/checkToken');
    }
}
