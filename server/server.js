const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const routes = require('./mainRoute')
const PORT = 5000;

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(cors());

    app.use((req,res,next)=>{
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Control-Allow-Methods','GET, POST,OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials',true);
        next();
    })
    app.use('/api', routes);

    app.listen(PORT, ()=> {
        console.log(`Listening to port ${PORT} `)})

module.exports = app;