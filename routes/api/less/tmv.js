var less = require('less');
var fs = require('fs');
var path = require('path');

var config = require('../../../config');

var TMV_PATH = path.join('edmunds/widgets/tmv', config.TMV_LATEST_VERSION);

exports.compile = function(req, res) {
    var fileName = getFileName(req.query.options || {});

    function renderLessCallback(error, styles) {
        if (error) {
            res.json({
                status: 'error',
                message: error.message
            });
            return;
        }
        res.json({
            status: 'success',
            styles: styles
        });
    }

    function readFileCallback(error, input) {
        if (error) {
            res.json({
                status: 'error',
                message: error.message
            });
            return;
        }
        // add custom variables
        input += getVariablesString(req.query.variables);
        // compile less
        less.render(input, {
            paths: [TMV_PATH + '/less/themes'],
            compress: true
        }, renderLessCallback);
    }

    fs.readFile(fileName, 'utf-8', readFileCallback);
};

function getFileName(options) {
    var theme = options.theme || 'simple',
        layout = options.layout || 'vertical',
        fileName = theme + '-' + layout + '.less';
    return path.join(TMV_PATH, '/less/themes', fileName);
}

function getVariablesString(records) {
    var str = '', name;
    for (name in records) {
        str += ((name.slice(0,1) === '@')? '' : '@') + name +': '+
            ((records[name].slice(-1) === ';')? records[name] : records[name] +';');
    }
    return str;
}
