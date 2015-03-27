locals
======

Enforces a prefix be added to all local variables. You can also specify that the rule only starts to take effect above a certain scope level.

Usage
-----

```Javascript
rules: {
    "prefix/local": [1, {"prefix": "$", "level": 2}]
}
```
This will add a warning every time a variable is declared at the second scope level without the prefix "$".