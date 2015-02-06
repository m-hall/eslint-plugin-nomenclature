'use strict';

var linter = require('eslint').linter,
    ESLintTester = require('eslint-tester'),
    eslintTester = new ESLintTester(linter);

eslintTester.addRuleTest('./lib/rules/prefix-parameters', {
    valid: [
        { code: 'function name(test) {}', args: [1, ''] },
        { code: 'function name(_test) {}', args: [1, '_'] },
        { code: 'function name(__test) {}', args: [1, '__'] },
        { code: 'function name($TEST) {}', args: [1, '$'] },
        { code: 'function name(__test, __test2) {}', args: [1, '__'] },
        { code: 'function name(_test, __test2) {}', args: [1, '_'] }
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
        }
    ]
});