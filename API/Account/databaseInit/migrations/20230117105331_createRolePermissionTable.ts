import { Knex } from 'knex';
import CreateTableBuilder = Knex.CreateTableBuilder;

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('role_permission', (table: CreateTableBuilder) => {
        table.integer('roleId')
            .unsigned()
            .references('id')
            .inTable('role')
            .onDelete('CASCADE').comment('The id of the associated role');
        table.integer('permissionId')
            .unsigned()
            .references('id')
            .inTable('permission')
            .onDelete('CASCADE').comment('The id of the associated role');
        table.increments('id').primary().comment('The id of the role_permission');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('role_permission');
}
