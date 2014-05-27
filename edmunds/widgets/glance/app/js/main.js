requirejs.config({
    paths: {
        jquery: 'libs/jquery-2.1.0',
        backbone: 'libs/backbone',
        underscore: 'libs/underscore',
        bootstrap: 'libs/bootstrap'
    }
});

require(['jquery', 'underscore', 'backbone'], function() {
    require([
        'app',
        'bootstrap'
    ], function(App) {
        var apiKey = 'axr2rtmnj63qsth3ume3tv5f',
            submodel = 'sedan';
        var app = new App({
            apiKey:     apiKey,
            submodel:   submodel
        });
        document.body.appendChild(app.el);
    });
});