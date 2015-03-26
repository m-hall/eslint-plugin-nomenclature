prefix-parameters
=================

Enforces prefixes to be added to all function parameters.

Usage
-----

```Javascript
rules: {
    "nomenclature/prefix-parameters": [1, "_"]
}
```
This will add a warning every time a parameter is detected that is not prefixed with "_".


```Javascript
rules: {
    "nomenclature/prefix-parameters": [2, ["req_", "opt_"]]
}
```
This will add an error every time a parameter is detected that is not prefixed with either "req_" or "opt_".