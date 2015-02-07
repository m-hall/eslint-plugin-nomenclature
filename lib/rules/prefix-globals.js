
module.exports = function (context) {
    'use strict';
    var level = 0,
        config = {
            prefix: ''
        };

    if (context.options[0]) {
        if (typeof context.options[0] === "string") {
            config.prefix = context.options[0];
        } else {
            config.prefix = context.options[0].prefix || config.prefix;
        }
    }
    function isValid(identifier) {
        return identifier.name.indexOf(config.prefix) === 0;
    }
    function testFunction(node) {
        if (level > 0) {
            return;
        }
        var i, l, identifier;
        for (i = 0, l = node.declarations.length; i < l; i++) {
            identifier = node.declarations[i];
            if (!isValid(identifier.id)) {
                context.report(identifier, 'Global variable "' + identifier.id.name + '" is not prefixed with "' + config.prefix + '".');
            }
        }
    }
    return {
        "FunctionDeclaration": function () {
            level++;
        },
        "FunctionDeclaration:exit": function () {
            level--;
        },
        "VariableDeclaration": testFunction
    };
};
