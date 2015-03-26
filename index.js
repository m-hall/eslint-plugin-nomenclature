
module.exports = {
    rules: {
        "prefix-parameters": require("./lib/rules/prefix-parameters"),
        "prefix-globals": require("./lib/rules/prefix-globals"),
        "prefix-scope": require("./lib/rules/prefix-scope")
    }
};
