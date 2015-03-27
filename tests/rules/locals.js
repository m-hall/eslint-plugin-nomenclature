'use strict';

var linter = require('eslint').linter,
    ESLintTester = require('eslint-tester');
var eslintTester = new ESLintTester(linter);

eslintTester.addRuleTest('./lib/rules/locals', {
    valid: [
        { code: 'function name(){ var local; }', args: [1, ''] },
        { code: 'function name(){ var _local; }', args: [1, '_'] },
        { code: 'function name(){ var __local; }', args: [1, '__'] },
        { code: 'function name(){ var $local; }', args: [1, '$'] },
        { code: 'function name(){ var __local, __local2; }', args: [1, '__'] },
        { code: 'function name(){ var _local, __local2; }', args: [1, '_'] },
        { code: 'function name(){ var local; function name2(){ var _local2; }}', args: [1, {'prefix': '_', 'level': 2}] }
    ],

    invalid: [
        {
            code: 'function name(){ var local; }',
            args: [1, '_'],
            errors: [ { message: 'Local variable "local" is not prefixed with "_".' } ]
        },
        {
            code: 'function name(){ var _local, local2; }',
            args: [1, '_'],
            errors: [ { message: 'Local variable "local2" is not prefixed with "_".' } ]
        },
        {
            code: 'function name(){ var _local, local2; }',
            args: [1, '__'],
            errors: [
                { message: 'Local variable "_local" is not prefixed with "__".' },
                { message: 'Local variable "local2" is not prefixed with "__".' }
            ]
        },
        {
            code: 'function name(){ var $local; }',
            args: [1, '_'],
            errors: [ { message: 'Local variable "$local" is not prefixed with "_".' } ]
        },
        {
            code: 'function name(){ var local; function name2(){ var local2; }}',
            args: [1, {'prefix': '_', 'level': 2}],
            errors: [ { message: 'Local variable "local2" is not prefixed with "_".' } ]
        }
    ]
});
