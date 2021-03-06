var http = require('http'),
    crypto = require('crypto'),
    url = require('url'),
    zlib = require('zlib'),
    config = require('../../config');

function httpRequest(options, content, onSuccess, onFail) {

    function handleResponse(response) {
        var chunks = [];
        response.on('data', function(chunk) {
            chunks.push(chunk);
        });

        response.on('end', function() {
            var data = Buffer.concat(chunks),
                encoding = response.headers['content-encoding'];
            try {
                if(encoding == 'gzip' || encoding == 'deflate') {
                    zlib.unzip(data, function(error, decoded) {
                        if(!error) {
                            onSuccess(decoded.toString(), response.statusCode);
                        } else {
                            onFail(error);
                        }
                    });
                } else {
                    onSuccess(data.toString(), response.statusCode);
                }
            } catch(e) {
                console.log('problem with decoding ' + encoding + ' response: ' + e);
                onFail(e.message);
            }
        });
    }

    var request = http.request(options, handleResponse);

    request.on('error', function(e) {
        console.log('problem with request to ' + options.path + ':' + e);
        onFail(e.message);
    });

    request.setHeader('Connection', 'Keep-Alive');
    if(content) {
        request.setHeader('Content-Length', Buffer.byteLength(content));
        request.write(content);
    }
    request.end();
}

var mashery = new function() {

    var HOST = 'api.mashery.com';

    var SITE_ID = config.MASHERY_SITE_ID;

    var API_KEY = config.MASHERY_API_KEY;

    var SHARED_SECRET = config.MASHERY_SHARED_SECRET;

    var SERVICE_KEY = {
        vehicle: config.MASHERY_VEHICLE_SERVICE_KEY,
        dealer: config.MASHERY_DEALER_SERVICE_KEY
    };

    this.keyValidate = function(serviceName, apiKey, onSuccess, onFail) {
        function validate(key) {
            if(!key.error) {
                onSuccess({valid: key.result && key.result.status == 'active' ? true : false});
            } else {
                onFail({
                    errorType: 'KEY_VALIDATION_ERROR',
                    message: key.error ? key.error.message : 'Invalid key.fetch response'
                });
            }
        }
        this.keyFetch(serviceName, apiKey, validate, onFail);
    };

    this.keyFetch = function(serviceName, apiKey, onSuccess, onFail) {
        var params = {
            service_key : SERVICE_KEY[serviceName],
            apikey : apiKey
        };
        jsonRpcQuery('key.fetch', params, onSuccess, onFail);
    };

    function jsonRpcQuery(method, params, onSuccess, onFail) {
        var options = {
                host : HOST,
                path : getJsonRpcUrl(),
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                }
            },
            jsonRpcRequest = {
                method : method,
                params : [ params ],
                id : 1
            };
        function handleError(error) {
            onFail({
                errorType: 'JSON_RPC_ERROR',
                message: error
            });
        }
        function handleResponse(data) {
            try {
                onSuccess(JSON.parse(data));
            } catch(e) {
                handleError('Invalid JSON RPC response: ' + data);
            }
        }
        httpRequest(options, JSON.stringify(jsonRpcRequest), handleResponse, handleError);
    }

    function getJsonRpcUrl() {
        return '/v2/json-rpc/' + SITE_ID + '?apikey=' + API_KEY + '&sig=' + getSig();
    }

    function getSig() {
        var epoch = Math.round(new Date().getTime()/1000.0),
            md5sum = crypto.createHash('md5');
        md5sum.update(API_KEY + SHARED_SECRET + epoch);
        return md5sum.digest('hex');
    }
};

var dealerOAuth = new function() {

    var HOST = 'api.edmunds.com';

    var API_KEY = config.MASHERY_DEALER_OAUTH_API_KEY;

    var SHARED_SECRET = config.MASHERY_DEALER_OAUTH_SHARED_SECRET;

    var TOKEN_PATH = '/dealer/token';

    this.accessToken = function(onSuccess, onFail) {
        var options = {
                host : HOST,
                path : TOKEN_PATH,
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            },
            clientData = 'client_id=' + API_KEY + '&client_secret=' + SHARED_SECRET + '&grant_type=client_credentials';
        function handleError(error) {
            onFail({
                errorType: 'OAUTH_ACCESS_TOKEN_ERROR',
                message: error
            });
        }
        function getToken(data) {
            var token;
            try {
                token = JSON.parse(data);
                if(token && token.access_token) {
                    onSuccess(token.access_token);
                } else {
                    handleError(token && token.error ? token.error : 'OAuth access token is missing');
                }
            } catch(e) {
                handleError('Invalid data: ' + data);
                console.log('problem with parsing access_token data:' + e);
            }

        }
        httpRequest(options, clientData, getToken, handleError);
    };

    this.get = function(path, query, onSuccess, onFail) {
        function oAuthQuery(accessToken) {
            var options = {
                host : HOST,
                path : path + '?' + query,
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Authorization' : 'Bearer ' + accessToken
                }
            };
            httpRequest(options, null, onSuccess, function(error) {
                onFail({
                    errorType: 'OAUTH_REQUEST_ERROR',
                    message: error
                });
            });
        }
        this.accessToken(oAuthQuery, onFail);
    };

};

exports.keyValidate = function(request, response) {
    var callbackName = request.query.callback,
        serviceName = request.query.service,
        apiKey = request.query.api_key;
    function onSuccess(data) {
        var str = JSON.stringify(data);
        response.end(callbackName ? callbackName + '(' + str + ')' : str);
    }
    function onError(error) {
        var errorStr = JSON.stringify(error);
        response.statusCode = 400;
        response.end(callbackName ? callbackName + '(' + errorStr + ')' : errorStr);
    }
    mashery.keyValidate(serviceName, apiKey, onSuccess, onError);
};

exports.sendLead = function(request, response) {
    var callbackName = request.query.callback,
        queryString = request.url.split('?')[1] || '';
    function onSuccess(data, status) {
        response.statusCode = status;
        response.end(data);
    }
    function onError(error) {
        response.statusCode = 400;
        var errorStr = JSON.stringify(error);
        response.end(callbackName ? callbackName + '(' + errorStr + ')' : errorStr);
    }
    dealerOAuth.get('/api/dealer/v2/lead', queryString, onSuccess, onError);
};
