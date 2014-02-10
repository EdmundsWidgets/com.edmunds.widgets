var express = require('express');
var http = require('http');
var path = require('path');

var routes = require('./routes');
var config = require('./config');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon('public/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({
    src: __dirname + '/less',
    dest: __dirname + '/public/css',
    prefix: '/css',
    compress: true
}));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

/* static resources */
// public folder
app.use(express.static(path.join(__dirname, 'public')));
// bower components
app.use('/libs', express.static(path.join(__dirname, 'bower_components')));
// widgets
app.use('/', express.static(path.join(__dirname, 'edmunds/widgets/')));
app.use('/tmv', express.static(path.join(__dirname, 'edmunds/widgets/tmv', config.TMV_LATEST_VERSION)));
app.use('/nvc', express.static(path.join(__dirname, 'edmunds/widgets/nvc', config.NVC_LATEST_VERSION)));

/* routes */
app.use(routes.error404);
app.get('/', routes.index);
// api
app.get('/api/keyvalidate', routes.api.mashery.keyValidate);
app.get('/api/dealer/sendlead', routes.api.mashery.sendLead);
// widget loader
app.get('/loader.js', routes.loader);
// tmv pages
app.get('/tmv/configure', routes.tmv.configure);
app.get('/tmv/about', routes.tmv.about);
app.get('/tmv/api/less', routes.api.less.tmv.compile);
// nvc routes
app.get('/nvc/configure', routes.nvc.configurator);
app.get('/nvc/about', routes.nvc.about);
app.get('/nvc/api/less', routes.api.less.nvc.compile);

/* start server */
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
