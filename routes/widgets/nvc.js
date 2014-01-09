exports.configurator = function(req, res){
    res.render('nvc/configurator', { title: 'NVC Configurator' });
};

exports.about = function(req, res){
    res.render('nvc/about', { title: 'NVC Widget Quick Start' });
};
