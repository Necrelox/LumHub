import { Knex } from 'knex';
import CreateTableBuilder = Knex.CreateTableBuilder;

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('permission', (table: CreateTableBuilder) => {
        table.string('permission', 32).notNullable().unique().comment('The permission allow to access to a specific resources');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now()).comment('The creation date of the permission');
        table.increments('id').primary().comment('The id of the permission');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('permission');
}
