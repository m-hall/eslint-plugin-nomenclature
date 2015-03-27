
module.exports = {
    rules: {
        "parameters": require("./lib/rules/parameters"),
        "globals": require("./lib/rules/globals"),
        "locals": require("./lib/rules/locals")
    }
};
