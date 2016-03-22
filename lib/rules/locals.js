module.exports = function (context) {
    'use strict';
    var level = 0,
        config = {
            prefix: '',
            level:  1
        };

    if (context.options[0]) {
        if (typeof context.options[0] === "string" || Array.isArray(context.options[0])) {
            config.prefix = context.options[0];
        } else {
            config.prefix = context.options[0].prefix || config.prefix;
            config.level = context.options[0].level || config.level;
        }
    }
    function plus() {
        level++;
    }

    function minus() {
        level--;
    }

    function isValid(identifier) {
        if (Array.isArray(config.prefix)) {
            return config.prefix.some(function (prefix) {
                return identifier.name.substring(0, prefix.length) === prefix;
            })
        } else {
            return identifier.name.indexOf(config.prefix) === 0;
        }
    }

    function testFunction(node) {
        if (level < config.level) {
            return;
        }
        var i, l, identifier;
        for (i = 0, l = node.declarations.length; i < l; i++) {
            identifier = node.declarations[i];
            if (!isValid(identifier.id)) {
                context.report(identifier, 'Local variable "' + identifier.id.name + '" is not prefixed with ' +
                    (Array.isArray(config.prefix) ? "any of \"" + config.prefix + "\"" : '"' + config.prefix + '"')
                    + '.');
            }
        }
    }

    return {
        "FunctionExpression":       plus,
        "FunctionDeclaration":      plus,
        "FunctionExpression:exit":  minus,
        "FunctionDeclaration:exit": minus,
        "VariableDeclaration":      testFunction
    };
};