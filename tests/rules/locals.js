"use strict";

var rule = require("../../lib/rules/locals"),
    RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("locals", rule, {
    valid: [
        { code: 'function name(){ var local; }', options: [''] },
        { code: 'function name(){ var _local; }', options: ['_'] },
        { code: 'function name(){ var __local; }', options: ['__'] },
        { code: 'function name(){ var $local; }', options: ['$'] },
        { code: 'function name(){ var __local, __local2; }', options: ['__'] },
        { code: 'function name(){ var _local, __local2; }', options: ['_'] },
        { code: 'function name(){ var local; function name2(){ var _local2; }}', options: [{'prefix': '_', 'level': 2}] },
        { code: 'function name(){ var _level1; function name2(){ var _local2, aArray, bBool, cChar; }}', options: [{'prefix': ['_','a','b','c'], 'level': 1}] },
        { code: 'function name(){ var level2Only; function name2(){ var _local2, aArray, bBool, cChar; }}', options: [{'prefix': ['_','a','b','c'], 'level': 2}] }
    ],

    invalid: [
        {
            code: 'function name(){ var local; }',
            options: ['_'],
            errors: [ { message: 'Local variable "local" is not prefixed with "_".' } ]
        },
        {
            code: 'function name(){ var _local, local2; }',
            options: ['_'],
            errors: [ { message: 'Local variable "local2" is not prefixed with "_".' } ]
        },
        {
            code: 'function name(){ var _local, local2; }',
            options: ['__'],
            errors: [
                { message: 'Local variable "_local" is not prefixed with "__".' },
                { message: 'Local variable "local2" is not prefixed with "__".' }
            ]
        },
        {
            code: 'function name(){ var $local; }',
            options: ['_'],
            errors: [ { message: 'Local variable "$local" is not prefixed with "_".' } ]
        },
        {
            code: 'function name(){ var local; function name2(){ var local2; }}',
            options: [{'prefix': '_', 'level': 2}],
            errors: [ { message: 'Local variable "local2" is not prefixed with "_".' } ]
        },
        {
            code: 'function name(){ var noprefix_from_array; }',
            options: [{'prefix': ['_','a','b','c']}],
            errors: [ { message: 'Local variable "noprefix_from_array" is not prefixed with any of "_,a,b,c".' } ]
        },
        {
            code: 'function name(){ var _level2; function name2(){ var noprefix_from_array_level2_only; }}',
            options: [{'prefix': ['_','a','b','c']}],
            errors: [ { message: 'Local variable "noprefix_from_array_level2_only" is not prefixed with any of "_,a,b,c".' } ]
        },
        {
            code: 'function name(){ var _level2_again; function name2(){ var noprefix2_from_array_level2_only; }}',
            options: [ ['_','a','b','c'] ],
            errors: [ { message: 'Local variable "noprefix2_from_array_level2_only" is not prefixed with any of "_,a,b,c".' } ]
        }
    ]
});