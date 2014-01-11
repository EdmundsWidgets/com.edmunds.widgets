exports.configure = function(req, res){
    res.render('tmv/configure', { title: 'TMV Configurator' });
};

exports.about = function(req, res){
    res.render('tmv/about', { title: 'TMV&reg; Widget Quick Start' });
};
