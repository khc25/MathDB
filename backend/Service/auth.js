const jwt = require("jwt-simple");
const config = require('../config');

class Auth {
    constructor(knex) {
        this.knex = knex;
    }
    Login(email, password) {
        console.log('Logging In', email, password)
        // console.log(users)
        if (email && password) {
            var email = email;
            var password = password;
            console.log(email, password)

            //knex query to find the user in the databse

            let users = this.knex.select().from('users').where({ "email": email })


            return users.then((res) => {
                console.log(res[0].id)
                console.log(res[0].password)
                console.log(res[0])
                // return res.email === email
                if (res[0].email === email && res[0].password === password) {
                    var payload = {
                        id: res[0].id,
                        // you can add more user details
                    };

                    console.log(payload)
                    var token = jwt.encode(payload, config.jwtSecret);
                    console.log(token)
                    return token
                    // jwt.sign({payload} , 'privatekey', {expiresIn: '72h'},(err,token) => {
                    //     console.log(token)
                    //     res.send(token);
                    // });

                } else {
                    console.log('Failure')
                    //res.sendStatus(401);

                }
            })
        } else {
            console.log('1')
            //res.sendStatus(401);
        }
    }
    SignUp(user) {
        console.log(user, 'lll')
        let query2 = this.knex
            .insert({
                name: user.name,
                email: user.email,
                password: user.password,
  
            })
            .into('users')
            .returning('id')
            .catch(err => {
                throw new Error(err);
            })
        let checkUserQuery = this.knex
            .select('email')
            .from('user')
            .where('email', user.email)
            .then((userNameList) => {
                if (userNameList.length === 0) {
                    return query2
                } else {
                    res.send('email exists')
                }
            }).catch((err) => console.log('email exists'))
        return checkUserQuery


    }


}

module.exports = Users;