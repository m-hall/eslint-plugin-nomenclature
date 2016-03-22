
module.exports = {
    rules: {
        'globals': require('./lib/rules/globals'),
        'locals': require('./lib/rules/locals'),
        'parameters': require('./lib/rules/parameters')
    }
};
