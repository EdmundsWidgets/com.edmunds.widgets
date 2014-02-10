var less = require('less');
var fs = require('fs');
var path = require('path');

var config = require('../../../config');

var THEMES_PATH = path.join('edmunds/widgets/nvc', config.NVC_LATEST_VERSION, '/less/themes');

exports.compile = function(req, res) {
    var fileName = getFileName(req.query.style || {});

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
            paths: [THEMES_PATH],
            compress: true
        }, renderLessCallback);
    }

    fs.readFile(fileName, 'utf-8', readFileCallback);
};

function getFileName(options) {
    var theme = options.theme || 'simple',
        colorScheme = options.colorScheme || 'light',
        fileName = theme + '-' + colorScheme + '.less';
    return path.join(THEMES_PATH, fileName);
}

function getVariablesString(variables) {
    var str = '', name;
    for (name in variables) {
        str += '@' + name + ': ' + variables[name] + ';';
    }
    return str;
}
