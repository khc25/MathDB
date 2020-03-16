
exports.up = function (knex) {
    return knex.schema
        .createTable('definition', function (table) {
            table.increments('id');
            table.string('name').notNullable();
            table.string('statement').notNullable();
            table.string('topic');
        })

};

exports.down = function (knex) {
    return knex.schema
        .dropTable('definition')
};
