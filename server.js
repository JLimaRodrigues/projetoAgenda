//variaveis de ambiente
require('dotenv').config();

//configurações do express
const express  = require('express');
const app      = express();

//configurações do moongose (BD)
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
 .then(() => {
    app.emit('pronto');
 })
 .catch(e => console.log(e));

//configurações de session
const session    = require('express-session');
const MongoStore = require('connect-mongo');
const flash      = require('connect-flash');

const routes  = require('./routes');
const path    = require('path');
const helmet  = require('helmet');
const csrf    = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

app.use(helmet());

//configurações para fazer POST dentro da aplicação
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//arquivos estáticos
app.use(express.static(path.resolve(__dirname, 'public')));

//configurações da session
const sessionOptions = session({
    secret: 'algumacoisaDesegredo',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, //uma semana
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

//configurações das views com caminho absoluto
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
//nossos próprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor Executando na porta 3000');
    });
})