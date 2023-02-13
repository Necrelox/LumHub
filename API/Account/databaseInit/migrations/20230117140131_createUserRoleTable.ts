import { Knex } from 'knex';
import CreateTableBuilder = Knex.CreateTableBuilder;

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user_role', (table: CreateTableBuilder) => {
        table.uuid('userUuid').notNullable()
            .references('uuid')
            .inTable('user')
            .onDelete('CASCADE')
            .comment('The uuid of the user');
        table.integer('roleId').notNullable().references('id').inTable('role')
            .onDelete('CASCADE').comment('The id of the role');
        table.increments('id').primary().comment('The id of user role');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('user_role');
}
