
module.exports = {
    rules: {
        "parameters": require("./lib/rules/parameters"),
        "globals": require("./lib/rules/globals"),
        "scope": require("./lib/rules/scope")
    }
};
