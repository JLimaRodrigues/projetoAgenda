const express = require('express');
const route   = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

//         Criar   Ler   Atualizar Apagar
// CRUD -> CREATE, READ, UPDATE,   DELETE
//         POST    GET   PUT       DELETE

// http://meusite.com/ <- GET (para  o servidor) -> entregue a página

//Rotas da Home
route.get('/', homeController.index);

//rotas de Login
route.get('/login', loginController.index);
route.post('/login/registrar', loginController.registrar);
route.post('/login/logar', loginController.logar);
route.get('/login/logout', loginController.logout);

module.exports = route;