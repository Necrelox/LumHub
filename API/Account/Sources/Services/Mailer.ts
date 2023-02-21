import nodemailer from 'nodemailer';
import * as process from 'process';

export interface MailOptions {
    from?: string;
    to?: string;
    subject?: string;
    text?: string;
    html?: string;
}

export class Mailer {
    private transporter: nodemailer.Transporter;

    constructor () {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASS
            }
        });
    }

    async sendMail (options: MailOptions): Promise<void> {
        await this.transporter.sendMail(options);
    }
}
