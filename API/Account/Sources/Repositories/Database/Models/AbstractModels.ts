import { Transaction, KnexDatatable, ErrorDatabase } from '@/Database/KnexDatatable';
import { ErrorEntity, MessageError } from '@/Errors/ErrorEntity';

export abstract class AbstractModels<T> {
    protected tableName: string;
    protected knex = KnexDatatable.getInstance();

    protected constructor(tableName: string) {
        this.tableName = tableName;
    }

    protected transformColumnsToArray(columns: object): string[] {
        const columnsArray: string[] = [];
        for (const column in columns) {
            if (typeof columns[column] === 'boolean' && columns[column])
                columnsArray.push(column);
            else if (typeof columns[column] === 'string' && columns[column].length > 0)
                columnsArray.push(columns[column]);
        }
        if (columnsArray.length === 0)
            columnsArray.push('*');
        return columnsArray;
    }

    public async create(entity: Partial<T>[], columnToSelect: Partial<Record<keyof T, boolean | string>>): Promise<T[]> {
        return this.knex.insert(entity)
            .into(this.tableName)
            .returning(this.transformColumnsToArray(columnToSelect))
            .then((result: T[]) => {
                if (result.length === 0)
                    throw new ErrorEntity(MessageError.MODEL_NOT_CREATED);
                return result;
            })
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err.detail);
            });
    }

    public async transactionCreate(entity: Partial<T>[], columnToSelect: Partial<Record<keyof T, boolean | string>>, trx: Transaction): Promise<T[]> {
        return this.knex.insert(entity)
            .into(this.tableName)
            .returning(this.transformColumnsToArray(columnToSelect))
            .transacting(trx)
            .then((result: T[]) => {
                if (result.length === 0)
                    throw new ErrorEntity(MessageError.MODEL_NOT_CREATED);
                return result;
            })
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err.detail);
            });
    }

    public async update(entity: Partial<T>, entityToUpdate: Partial<T>): Promise<void> {
        await this.knex.update(entity)
            .where(entityToUpdate)
            .from(this.tableName)
            .then((result: number) => {
                if (result === 0)
                    throw new ErrorEntity(MessageError.MODEL_NOT_UPDATED);
            })
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err.detail);
            });
    }

    public async transactionUpdate(entity: Partial<T>, entityToUpdate: Partial<T>, trx: Transaction): Promise<void> {
        await this.knex.update(entity)
            .where(entityToUpdate)
            .from(this.tableName)
            .transacting(trx)
            .then((result: number) => {
                if (result === 0)
                    throw new ErrorEntity(MessageError.MODEL_NOT_UPDATED);
            })
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err.detail);
            });
    }

    public async delete(entityToDelete: Partial<T>): Promise<void> {
        await this.knex.delete()
            .where(entityToDelete)
            .from(this.tableName)
            .then((result: number) => {
                if (result === 0)
                    throw new ErrorEntity(MessageError.MODEL_NOT_DELETED);
            })
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err.detail);
            });
    }

    public async transactionDelete(entityToDelete: Partial<T>, trx: Transaction): Promise<void> {
        await this.knex.delete()
            .where(entityToDelete)
            .from(this.tableName)
            .transacting(trx)
            .then((result: number) => {
                if (result === 0)
                    throw new ErrorEntity(MessageError.MODEL_NOT_DELETED);
            })
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err.detail);
            });
    }

    public async get(entityToSearch: Partial<T>, columnToSelect: Partial<Record<keyof T, boolean | string>>): Promise<T[]> {
        return this.knex.select(this.transformColumnsToArray(columnToSelect))
            .from(this.tableName)
            .where(entityToSearch)
            .then((result: T[]) => {
                if (result.length === 0)
                    throw new ErrorEntity(MessageError.MODEL_NOT_FOUND);
                return result;
            })
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err.detail);
            });
    }

    public async transactionGet(entityToSearch: Partial<T>, columnToSelect: Partial<Record<keyof T, boolean | string>>, trx: Transaction): Promise<T[]> {
        return this.knex.select(this.transformColumnsToArray(columnToSelect))
            .from(this.tableName)
            .where(entityToSearch)
            .transacting(trx)
            .then((result: T[]) => {
                if (result.length === 0)
                    throw new ErrorEntity(MessageError.MODEL_NOT_FOUND);
                return result;
            })
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err.detail);
            });
    }

    public async getAll(columnToSelect: Record<keyof T, boolean | string>): Promise<T[]> {
        return this.knex.select(this.transformColumnsToArray(columnToSelect))
            .from(this.tableName)
            .then((result: T[]) => {
                if (result.length === 0)
                    throw new ErrorEntity(MessageError.MODEL_NOT_FOUND);
                return result;
            })
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err.detail);
            });
    }

    public async transactionGetAll(columnToSelect: Record<keyof T, boolean | string>, trx: Transaction): Promise<T[]> {
        return this.knex.select(this.transformColumnsToArray(columnToSelect))
            .from(this.tableName)
            .transacting(trx)
            .then((result: T[]) => {
                if (result.length === 0)
                    throw new ErrorEntity(MessageError.MODEL_NOT_FOUND);
                return result;
            })
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err.detail);
            });
    }
}
