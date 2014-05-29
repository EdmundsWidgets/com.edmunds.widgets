requirejs.config({
    paths: {
        jquery: '../../bower_components/jquery/dist/jquery',
        backbone: '../../bower_components/backbone/backbone',
        underscore: '../../bower_components/underscore/underscore',
        bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap'
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