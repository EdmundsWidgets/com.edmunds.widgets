exports.configurator = function(req, res){
    res.render('tmv/configurator', { title: 'TMV Configurator' });
};

exports.about = function(req, res){
    res.render('tmv/about', { title: 'TMV&reg; Widget Quick Start' });
};
