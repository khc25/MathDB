const express = require('express');
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const authClass = require('./auth');

//import Service
// const Students = require('./Service/students')
// const Users = require('./Service/users');
// const Blogs = require('./Service/blogs');
const Test = require('./Service/test');
const Propositions = require('./Service/proposition');
const Definitions = require('./Service/definition');

//import Router
// const usersRouter = require('./Router/usersRouter');
// const studentsRouter = require('./Router/studentsRouter')
// const blogsRouter = require('./Router/blogsRouter')
// const testRouter = require('./Router/testRouter');
const propositionRouter = require('./Router/propositionRouter');
const definitionRouter =require('./Router/definitionRouter')



const app = express();
const auth = authClass();

//config knexfile and knex
const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);

const cors = require('cors');

// const corsOptions = {
//     origin: 'http://localhost:3000'
// }

// app.use(cors(corsOptions));

app.use(cors());

//config auth
app.use(auth.initialize());

//config Parser
app.use(bodyParser.json());
app.use(cookieParser())


//oop object for service
// let student = new Students(knex);
// let user = new Users(knex);
// let blog = new Blogs(knex);
// let test = new Test(knex);
let definition = new Definitions(knex);
let proposition = new Propositions(knex);


// you may also set express here
app.get('/', function(req, res){
    res.send('Welcome to MathDB backend')
})


//means need authentication on this route
//auth.authenticate(),


//oop object for route
// app.use('/api/test/',auth.authenticate(), (new testRouter(test)).router());
app.use('/definition',(new definitionRouter(definition)).router());
app.use('/proposition',(new propositionRouter(proposition)).router());

//set PORT
const PORT = process.env.PORT || 8080

//set web server host
app.listen(PORT, ()=>{
    console.log(`Port number is ${PORT}`)
})
