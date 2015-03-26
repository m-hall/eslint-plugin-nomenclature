'use strict';

var linter = require('eslint').linter,
    ESLintTester = require('eslint-tester');
var eslintTester = new ESLintTester(linter);

eslintTester.addRuleTest('./lib/rules/globals', {
    valid: [
        { code: 'var global;', args: [1, ''] },
        { code: 'var _global;', args: [1, '_'] },
        { code: 'var __global', args: [1, '__'] },
        { code: 'var $global;', args: [1, '$'] },
        { code: 'var __global1, __global2;', args: [1, '__'] },
        { code: 'var _global1, __global2', args: [1, '_'] },
        { code: 'function name(_param){ var local; }', args: [1, '$'] },
        { code: 'var $global1; function name(_param){ var local; }', args: [1, '$'] },
        { code: 'var $global1; function name(_param){ var local; } var $global2;', args: [1, '$'] }
    ],

    invalid: [
        {
            code: 'var global;',
            args: [1, '_'],
            errors: [ { message: 'Global variable "global" is not prefixed with "_".' } ]
        },
        {
            code: 'var global, _global2;',
            args: [1, '_'],
            errors: [ { message: 'Global variable "global" is not prefixed with "_".' } ]
        },
        {
            code: 'var global, _global2;',
            args: [1, '__'],
            errors: [
                { message: 'Global variable "global" is not prefixed with "__".' },
                { message: 'Global variable "_global2" is not prefixed with "__".' }
            ]
        },
        {
            code: 'var $global, _GLOBAL;',
            args: [1, '_'],
            errors: [ { message: 'Global variable "$global" is not prefixed with "_".' } ]
        },
        {
            code: 'var _global; function name() {} var _global2, $global3;',
            args: [1, '_'],
            errors: [ { message: 'Global variable "$global3" is not prefixed with "_".' } ]
        }
    ]
});
