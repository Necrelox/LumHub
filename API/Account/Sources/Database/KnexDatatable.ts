import { Knex, knex } from 'knex';
import Transaction = Knex.Transaction;

export type { Transaction };

export interface ErrorDatabase {
    length: number;
    name: string;
    severity: string;
    code: string;
    detail: string;
    hint: string;
    position: string;
    internalPosition: string;
    internalQuery: string;
    where: string;
    schema: string;
    table: string;
    column: string;
    dataType: string;
    constraint: string;
    file: string;
    line: string;
    routine: string;
    stack: string;
    message: string;
}

export class KnexDatatable {
    private static instance: Knex;

    public static getInstance(): Knex {
        if (!KnexDatatable.instance) {
            KnexDatatable.instance = knex({
                client: 'pg',
                connection: {
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    port: Number(process.env.DB_PORT) || 5432,
                },
                pool: {
                    min: 0,
                    max: 10,
                },
                acquireConnectionTimeout: 10000,
            });
        }
        return KnexDatatable.instance;
    }
}
