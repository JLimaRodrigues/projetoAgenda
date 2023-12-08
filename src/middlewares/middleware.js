exports.middlewareGlobal = (req, res, next) => { 
    res.locals.variavelGlobal = "Está é uma variável global";

    if(req.body.nome){
        req.body.nome = req.body.nome.replace('Lima', 'Que nome brabo');
        console.log(`Vi que você postou ${req.body.nome}`);
    }
    next();
};

exports.outroMiddleware = (req, res, next) => {
    console.log('Outro Middleware');
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if(err && 'EBADCSRFTOKEN' === err.code){
        return res.render('404');
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}