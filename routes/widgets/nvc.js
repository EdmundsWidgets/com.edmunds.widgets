exports.configurator = function(req, res) {
    res.render('nvc/configurator', {
        title: 'NVC Configurator',
        debug: req.query.debug === 'true',
        portal: req.query.portal === 'true'
    });
};

exports.about = function(req, res) {
    res.render('nvc/about', { title: 'NVC Widget Quick Start' });
};
