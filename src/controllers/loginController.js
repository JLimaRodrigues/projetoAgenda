const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado');
    return res.render('login');
}

exports.registrar = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.registrar();
    
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(function(){
               return res.redirect('/login');
            });
            return;
        }
    
        req.flash('success', 'Seu usuário foi criado com sucesso.');
        req.session.save(function(){
           return res.redirect('/login');
        });
        return;
    } catch(e){
        console.log(e);
        return res.render('404');
    }
    
}

exports.logar = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.logar();
    
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(function(){
               return res.redirect('/login');
            });
            return;
        }
    
        req.flash('success', 'Você logou no sistema.');
        req.session.user = login.user;
        req.session.save(function(){
           return res.redirect('/login');
        });
        return;
    } catch(e){
        console.log(e);
        return res.render('404');
    }
    
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
    return;
}