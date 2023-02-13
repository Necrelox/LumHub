import { Knex } from 'knex';
import CreateTableBuilder = Knex.CreateTableBuilder;

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user', (table: CreateTableBuilder) => {
        table.string('username', 20)
            .notNullable()
            .unique()
            .checkLength('>=', 3)
            .checkLength('<=', 20)
            .checkRegex('^[a-zA-Z0-9_]*$')
            .comment('The username of the user');
        table.string('email', 255).notNullable().unique().comment('The email of the user');
        table.specificType('password', 'BYTEA').notNullable().comment('The password encrypt of the user');

        table.string('firstName', 45).nullable().checkLength('<=', 45).comment('First name of the user');
        table.string('lastName', 45).nullable().checkLength('<=', 45).comment('Last name of the user');
        table.string('phoneNumber', 45).nullable().checkLength('<=', 45).comment('Phone number of the user');
        table.string('country', 45).nullable().checkLength('<=', 45).comment('Country of the user');
        table.string('postalCode', 45).nullable().checkLength('<=', 45).comment('Postal code of the user');
        table.string('city', 45).nullable().checkLength('<=', 45).comment('City of the user');
        table.string('address', 255).nullable().checkLength('<=', 45).comment('Address of the user');
        table.string('activityMessage', 255).nullable().checkLength('<=', 255).comment('The activity message of the user');
        table.integer('coins').notNullable().defaultTo(0).comment('The number of coins of the user');
        table.check('coins >= 0');

        table.boolean('isConnected').notNullable().defaultTo(false).comment('The connection status of the user');
        table.boolean('isBlackListed').notNullable().defaultTo(false).comment('The black list status of the user');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now()).comment('The creation date of the user');
        table.timestamp('updatedAt').nullable().comment('The last update date of the user');
        table.uuid('uuid').notNullable().defaultTo(knex.raw('gen_random_uuid()')).primary().comment('The uuid of the user');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('user');
}
