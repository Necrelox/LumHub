import { AccountRouter, InformationRouter, AdminRouter, TokenRouter, StatusRouter } from '@/Routes/index';

import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import { readFileSync } from 'fs';
import cors from 'cors';
import helmet from 'helmet';

export class Server {
    private static instance: Server;
    public app: Application;

    private constructor(name: string, version: string, port: number) {
        this.app = express();
        this.app.set('name', name);
        this.app.set('version', version);
        this.app.set('port', port);
        this.initCors();
        this.initMiddlewareExpress();
        this.initMiddlewareHelmet();
    }

    private initCors(): void {
        this.app.use(cors(
            {
                origin: '*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
                credentials: true,
                optionsSuccessStatus: 200,
                preflightContinue: true
            }
        ));
    }

    private initMiddlewareExpress(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    private initMiddlewareHelmet(): void {
        this.app.use(helmet());
    }

    public static getInstance(name: string, version: string, port: number): Server {
        if (!Server.instance)
            Server.instance = new Server(name, version, port);
        return Server.instance;
    }

    public listen(): void {
        this.app.listen(this.app.get('port'), () => {
            const displayConnected: string = readFileSync(`${__dirname}/displayConnected.ascii`, 'utf8');
            console.log(displayConnected
                .replace('[name]', this.app.get('name'))
                .replace('[version]', this.app.get('version'))
                .replace('[port]', this.app.get('port').toString())
                .replace('[status]', 'started ✅ '));
        });
        this.callRouter();
    }

    private callRouter(): void {
        this.app.use('', new AccountRouter().getRouter());
        this.app.use('/status', new StatusRouter().getRouter());
        this.app.use('/token', new TokenRouter().getRouter());
        this.app.use('/information', new InformationRouter().getRouter());
        this.app.use('/admin', new AdminRouter().getRouter());
    }
}
