const passport = require('passport');
const passportJWT = require('passport-jwt');
const config = require('./config');
const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);

const ExtractJwt = passportJWT.ExtractJwt;

module.exports = function () {

    let opts = {}
    opts.secretOrKey = config.jwtSecret
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    console.log(ExtractJwt.fromAuthHeaderAsBearerToken())

    const strategy = new passportJWT.Strategy(opts, (payload, done) => {
        //knex user to return id which matches the payload.id
        let user = knex.select('id', 'email').from('users').where('id', payload.id)
        return user.then((res) => {
            console.log(res)
            if (res[0].id == payload.id) {
                return done(null, { id: user.id });
            } else {
                return done(new Error("User not found"), null);
            }
        })
        // const user = users.find((user)=>{
        //     return user.id == payload.id
        // });

    });
    passport.use(strategy);

    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
}