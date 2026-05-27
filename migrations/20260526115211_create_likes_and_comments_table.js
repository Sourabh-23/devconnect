exports.up = function(knex) {
    return knex.schema
        .createTable('likes', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().notNullable();
            table.foreign('user_id').references('users.id').onDelete('CASCADE');
            table.integer('post_id').unsigned().notNullable();
            table.foreign('post_id').references('posts.id').onDelete('CASCADE');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            // Ek user ek post ko sirf ek baar like kar sake
            table.unique(['user_id', 'post_id']);
        })
        .createTable('comments', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().notNullable();
            table.foreign('user_id').references('users.id').onDelete('CASCADE');
            table.integer('post_id').unsigned().notNullable();
            table.foreign('post_id').references('posts.id').onDelete('CASCADE');
            table.text('content').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('likes')
        .dropTable('comments');
};