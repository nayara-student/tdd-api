const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

class App{
    constructor(){
        this.server = express();
        mongoose.connect('mongodb+srv://admin:admin@apiharrypotter-gcmod.mongodb.net/apiharrypotter?retryWrites=true&w=majority'
        ,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        mongoose.connection.on('error', (err) =>{
            console.log('Falha na conexão com o banco apiharrypotter');
        });

        mongoose.connection.on('disconnected', ()=>{
            console.log('Aplicação desconectada do banco apiharrypotter');
        });

        mongoose.set('useCreateIndex', true);

        this.middlewares();
        this.routes();
    }

    middlewares(){
        //middleware global
        this.server.use(express.json());
    }

    routes(){
        //middleware global
        this.server.use(routes);
    }
}

module.exports = new App().server;