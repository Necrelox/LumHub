import { Knex } from 'knex';
import CreateTableBuilder = Knex.CreateTableBuilder;

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user_token', (table: CreateTableBuilder) => {
        table.text('token')
            .notNullable()
            .unique()
            .comment('The token of the user');
        table.string('publicKey', 255).notNullable().comment('The public key of the token');
        table.uuid('userUuid').notNullable()
            .references('uuid')
            .inTable('user')
            .onDelete('CASCADE')
            .comment('The uuid of the user');
        table.uuid('uuid')
            .notNullable()
            .defaultTo(knex.raw('gen_random_uuid()'))
            .primary()
            .comment('The uuid of the user token');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('user_token');
}
