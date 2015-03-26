'use strict';

var linter = require('eslint').linter,
    ESLintTester = require('eslint-tester');
var eslintTester = new ESLintTester(linter);

eslintTester.addRuleTest('./lib/rules/prefix-parameters', {
    valid: [
        { code: 'function name(test) {}', args: [1, ''] },
        { code: 'function name(_test) {}', args: [1, '_'] },
        { code: 'function name(__test) {}', args: [1, '__'] },
        { code: 'function name($TEST) {}', args: [1, '$'] },
        { code: 'function name(__test, __test2) {}', args: [1, '__'] },
        { code: 'function name(_test, __test2) {}', args: [1, '_'] },
        { code: 'function name(req_test, opt_test2) {}', args: [1, ['req_', 'opt_']] }
    ],

    invalid: [
        {
            code: 'function name(test) {}',
            args: [1, '_'],
            errors: [ { message: 'Parameter "test" is not prefixed with "_".' } ]
        },
        {
            code: 'function name(test1, _test2) {}',
            args: [1, '_'],
            errors: [ { message: 'Parameter "test1" is not prefixed with "_".' } ]
        },
        {
            code: 'function name(test1, _test2) {}',
            args: [1, '__'],
            errors: [
                { message: 'Parameter "test1" is not prefixed with "__".' },
                { message: 'Parameter "_test2" is not prefixed with "__".' }
            ]
        },
        {
            code: 'function name($test, _TEST) {}',
            args: [1, '_'],
            errors: [ { message: 'Parameter "$test" is not prefixed with "_".' } ]
        },
        {
            code: 'function name($test, _TEST) {}',
            args: [1, ['req_', 'opt_']],
            errors: [
                { message: 'Parameter "$test" is not prefixed with "req_" or "opt_".' },
                { message: 'Parameter "_TEST" is not prefixed with "req_" or "opt_".' }
            ]
        }
    ]
});
