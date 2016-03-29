'use strict';

var rule = require('../../lib/rules/parameters'),
    RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('parameters', rule, {
    valid: [
        { code: 'function name(test) {}', options: [''] },
        { code: 'function name(_test) {}', options: ['_'] },
        { code: 'function name(__test) {}', options: ['__'] },
        { code: 'function name($TEST) {}', options: ['$'] },
        { code: 'function name(__test, __test2) {}', options: ['__'] },
        { code: 'function name(_test, __test2) {}', options: ['_'] },
        { code: 'function name(req_test, opt_test2) {}', options: [['req_', 'opt_']] }
    ],

    invalid: [
        {
            code: 'function name(test) {}',
            options: ['_'],
            errors: [ { message: 'Parameter "test" is not prefixed with "_".' } ]
        },
        {
            code: 'function name(test1, _test2) {}',
            options: ['_'],
            errors: [ { message: 'Parameter "test1" is not prefixed with "_".' } ]
        },
        {
            code: 'function name(test1, _test2) {}',
            options: ['__'],
            errors: [
                { message: 'Parameter "test1" is not prefixed with "__".' },
                { message: 'Parameter "_test2" is not prefixed with "__".' }
            ]
        },
        {
            code: 'function name($test, _TEST) {}',
            options: ['_'],
            errors: [ { message: 'Parameter "$test" is not prefixed with "_".' } ]
        },
        {
            code: 'function name($test, _TEST) {}',
            options: [['req_', 'opt_']],
            errors: [
                { message: 'Parameter "$test" is not prefixed with "req_" or "opt_".' },
                { message: 'Parameter "_TEST" is not prefixed with "req_" or "opt_".' }
            ]
        }
    ]
});
