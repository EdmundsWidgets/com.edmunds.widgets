exports.tmv = require('./widgets/tmv');
exports.nvc = require('./widgets/nvc');

exports.index = function(req, res){
    res.render('index', { title: 'Edmunds Widgets' });
};

exports.error404 = function(req, res){
    res.status(404).render('404');
};
