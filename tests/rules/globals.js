'use strict';

var rule = require('../../lib/rules/globals'),
    RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('globals', rule, {
    valid: [
        { code: 'var global;', options: [''] },
        { code: 'var _global;', options: ['_'] },
        { code: 'var __global', options: ['__'] },
        { code: 'var $global;', options: ['$'] },
        { code: 'var __global__global2;', options: ['__'] },
        { code: 'var _global__global2', options: ['_'] },
        { code: 'function name(_param){ var local; }', options: ['$'] },
        { code: 'var $global1; function name(_param){ var local; }', options: ['$'] },
        { code: 'var $global1; function name(_param){ var local; } var $global2;', options: ['$'] }
    ],

    invalid: [
        {
            code: 'var global;',
            options: ['_'],
            errors: [ { message: 'Global variable "global" is not prefixed with "_".' } ]
        },
        {
            code: 'var global, _global2;',
            options: ['_'],
            errors: [ { message: 'Global variable "global" is not prefixed with "_".' } ]
        },
        {
            code: 'var global, _global2;',
            options: ['__'],
            errors: [
                { message: 'Global variable "global" is not prefixed with "__".' },
                { message: 'Global variable "_global2" is not prefixed with "__".' }
            ]
        },
        {
            code: 'var $global, _GLOBAL;',
            options: ['_'],
            errors: [ { message: 'Global variable "$global" is not prefixed with "_".' } ]
        },
        {
            code: 'var _global; function name() {} var _global2, $global3;',
            options: ['_'],
            errors: [ { message: 'Global variable "$global3" is not prefixed with "_".' } ]
        }
    ]
});
