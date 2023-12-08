const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    res.render('contato',{
        contato: {}
    });
}

exports.registrar = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.registrar();
    
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato/index'));
            return;
        }
    
        req.flash('success', 'Contato registrado com sucesso.');
        req.session.save(() => res.redirect(req.get('referer')));
        return;
    } catch(e){
        console.log(e);
        res.render('404');
    }
}

exports.editarContato = async (req, res) => {
    if(!req.params.id) return res.render('404');

    const contato = await Contato.buscaPorId(req.params.id);

    if(!contato) return res.render('404');

    res.render('contato', { contato });
}

exports.editar = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.editar(req.params.id)
    
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect(req.get('referer')));
            return;
        }
    
        req.flash('success', 'Contato editado com sucesso.');
        req.session.save(() => res.redirect(req.get('referer')));
        return;
    } catch(e){
        console.log(e)
        res.render('404');
    }
}