var less = require('less');
var fs = require('fs');
var path = require('path');

var config = require('../../../config');

var NVC_PATH = path.join('edmunds/widgets/nvc', config.NVC_LATEST_VERSION);

exports.compile = function(req, res) {
    var fileName = getFileName(req.query.options || {});

    function renderLessCallback(error, styles) {
        if (error) {
            res.send(500, error.message);
            return;
        }
        res.setHeader('Content-Type', 'text/css');
        res.send(styles);
    }

    function readFileCallback(error, input) {
        if (error) {
            res.send(500, error.message);
            return;
        }
        // add custom variables
        input += getVariablesString(req.query.variables);
        // compile less
        less.render(input, {
            paths: [NVC_PATH + '/less/themes'],
            compress: true
        }, renderLessCallback);
    }

    fs.readFile(fileName, 'utf-8', readFileCallback);
};

function getFileName(options) {
    var theme = options.theme || 'simple',
        colorScheme = options.colorScheme || 'light',
        fileName = theme + '-' + colorScheme + '.less';
    return path.join(NVC_PATH, '/less/themes', fileName);
}

function getVariablesString(records) {
    var str = '', name;
    for (name in records) {
        str += ((name.slice(0,1) === '@')? '' : '@') + name +': '+
            ((records[name].slice(-1) === ';')? records[name] : records[name] +';');
    }
    return str;
}
