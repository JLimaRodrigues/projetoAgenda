const express           = require('express');
const route             = express.Router();
const homeController    = require('./src/controllers/homeController');
const loginController   = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const { loginRequired } = require('./src/middlewares/middleware');

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

//rotas de contato
route.get('/contato/index', loginRequired, contatoController.index);
route.post('/contato/registrar', loginRequired, contatoController.registrar);
route.get('/contato/index/:id', loginRequired, contatoController.editarContato);
route.post('/contato/editar/:id', loginRequired, contatoController.editar);

module.exports = route;