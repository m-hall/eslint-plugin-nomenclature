
module.exports = function (context) {
    'use strict';
    var config = {
        prefix: ''
    };

    if (context.options[0]) {
        if (typeof context.options[0] === "string") {
            config.prefix = context.options[0];
        } else {
            config.prefix = context.options[0].prefix || config.prefix;
        }
    }
    function isValid(param) {
        return param.indexOf(config.prefix) === 0;
    }
    return {
        "FunctionDeclaration": function (node) {
            var i, l;
            for (i = 0, l = node.params.length; i < l; i++) {
                if (!isValid(node.params[i])) {
                    context.report(node, 'Parameter "' + node.params[i] + '" is not prefixed with "' + config.prefix + '"');
                }
            }
        }
    };
};
