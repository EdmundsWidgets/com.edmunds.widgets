var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
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

// static resources
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use('/tmv', express.static(path.join(__dirname, 'edmunds/widgets/tmv/' + config.TMV_LATEST_VERSION)));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// routes
app.use(routes.error404);
app.get('/', routes.index);

app.get('/api/tmv/less', routes.api.tmv.less);
app.get('/api/keyvalidate', routes.api.mashery.keyValidate);
app.get('/api/dealer/sendlead', routes.api.mashery.sendLead);

app.get('/tmv/configure', routes.tmv.configure);
app.get('/tmv/about', routes.tmv.about);

app.get('/nvc/configure', routes.nvc.configurator);
app.get('/nvc/about', routes.nvc.about);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
