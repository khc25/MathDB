class Test {
    constructor(knex) {
        this.knex = knex
    }

    //inside the bucket is the request data

    service_1(id) {
        //type your knex SQL query
        let query = this.knex.select().from('testtable')
        //
        return query.then((rows) => {
            return rows
        })
    }
}

module.exports = Test;