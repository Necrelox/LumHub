import { AccountController } from '@/Controllers/index';
import { AbstractRouter } from '@/Routes/AbstractRouter';
import { tokenChecker } from '@/Middlewares/index';

export class AccountRouter extends AbstractRouter<AccountController> {
    constructor() {
        super(new AccountController());
    }

    protected initRoutes(): void {
        this.router.post('/register', this.controller.register);
        this.router.post('/login', this.controller.login);
        this.router.get('/verify-token', tokenChecker, this.controller.verifyToken);
        this.router.get('/logout', tokenChecker, this.controller.logout);
    }
}
