exports.configure = function(req, res) {
    res.render('tmv/configure', {
        title: 'TMV Configurator',
        debug: req.query.debug === 'true',
        portal: req.query.portal === 'true'
    });
};

exports.about = function(req, res) {
    res.render('tmv/about', { title: 'TMV&reg; Widget Quick Start' });
};
