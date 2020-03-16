class Definition {
    constructor(knex) {
        this.knex = knex
    }


    get() {
        let getQuery = this.knex.select().from('definition')

        return getQuery.then((rows)=> {
            return rows
        })
    }

    post(body) {
        console.log("post Definition",body)
        let postQuery = this.knex.insert({
            name:body.name,
            statement:body.statement,
            topic:body.topic,

        })
        .into('definition')
        .returning('id')

        return postQuery
    }
}

module.exports = Definition;