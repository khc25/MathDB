class Proposition {
    constructor(knex) {
        this.knex = knex
    }

    get() {
        let getQuery = this.knex.select().from('proposition')

        return getQuery.then((rows)=> {
            return rows
        })
    }

    post(body) {
        console.log(body)
        let postQuery = this.knex.insert({
            statement: body.statement,
            proof: body.proof,
            topic: body.topic,

        })
        .into('proposition')
        .returning('id')

        return postQuery
    }
}

module.exports = Proposition;