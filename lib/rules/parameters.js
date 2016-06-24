
module.exports = function (context) {
    'use strict';
    var rEscape = /[-\/\\^$*+?.()|[\]{}]/g;
    var rPrefix = null;
    var prefix = context.options[0];

    if (prefix) {
        if (typeof prefix === 'object' && !(prefix instanceof Array)) {
            prefix = prefix.prefix;
        }
        if (typeof prefix === 'string') {
            rPrefix = new RegExp('^' + prefix.replace(rEscape, '\\$&'));
            prefix = '"' + prefix + '"';
        } else if (prefix instanceof Array) {
            rPrefix = prefix.map(function (val) { return val.replace(rEscape, '\\$&'); });
            rPrefix = new RegExp('^(' + rPrefix.join('|') + ')');
            prefix = '"' + prefix.join('" or "') + '"';
        }
    }
    function isValid(param) {
        return param.search(rPrefix) === 0;
    }
    function testFunction(node) {
        if (!rPrefix) {
            return;
        }
        var i, l, param;
        for (i = 0, l = node.params.length; i < l; i++) {
            param = node.params[i];
            if (!isValid(param.name)) {
                context.report(param, 'Parameter "' + param.name + '" is not prefixed with ' + prefix + '.');
            }
        }
    }
    return {
        'FunctionDeclaration': testFunction,
        'FunctionExpression': testFunction,
        'ArrowFunctionExpression': testFunction
    };
};
