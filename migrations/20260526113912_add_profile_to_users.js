exports.up = function(knex) {
    return knex.schema.alterTable('users', (table) => {
        table.string('bio', 500).nullable();
        table.string('avatar', 255).nullable();
        table.string('github', 255).nullable();
        table.string('linkedin', 255).nullable();
        table.string('skills', 500).nullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('users', (table) => {
        table.dropColumn('bio');
        table.dropColumn('avatar');
        table.dropColumn('github');
        table.dropColumn('linkedin');
        table.dropColumn('skills');
        table.dropColumn('updated_at');
    });
};
