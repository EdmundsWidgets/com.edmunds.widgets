exports.api = require('./api');
exports.tmv = require('./widgets/tmv');
exports.nvc = require('./widgets/nvc');

exports.index = function(req, res){
    res.render('index', { title: 'Edmunds Widgets' });
};

exports.loader = function(req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.render('loader', {
        baseUrl: req.protocol + '://' + req.headers.host
    });
};

exports.error404 = function(req, res){
    res.status(404).render('404');
};
