exports.up = function (knex) {
    return knex.schema
        .createTable('proposition', function (table) {
            table.increments('id');
            table.string('statement').notNullable();
            table.string('proof').notNullable();
            table.string('topic');
        })

};

exports.down = function (knex) {
    return knex.schema
        .dropTable('proposition')
};
