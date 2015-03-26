prefix-parameters
=================

Enforces a prefix be added to all global variables.

Usage
-----

```Javascript
rules: {
    "prefix/globals": [1, "$"]
}
```
This will add a warning every time a global variable is declared with a var statement that is not prefixed with "$".