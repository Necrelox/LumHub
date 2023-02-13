import { Knex } from 'knex';
import CreateTableBuilder = Knex.CreateTableBuilder;

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('role', (table: CreateTableBuilder) => {
        table.string('role', 16).notNullable().unique().comment('The role name (he contain several permission thanks to role_permission table)');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now()).comment('The creation date of the role');
        table.increments('id').primary().comment('The id of the role');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('role');
}
