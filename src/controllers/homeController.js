exports.paginaInicial = (req, res) => {
    res.render('index', {
        titulo: "Esse é o titulo",
        numeros: [1, 2 , 3, 4, 5]
    });
}; 

exports.trataPost = (req, res) => {
    res.send(req.body);
}