module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module"
    },
    "rules": {
        "curly": ["error", "multi-line"],
        "import/default": "off",
        "indent": ["error", 2, { "SwitchCase": 1 }],
        "new-cap": 0,
        "max-params": ["error", 5],
        "no-console": "error",
        "object-curly-spacing": ["error", "always"],
        "quotes": ["error", "single"],
        "semi": ["error", "never"],
        "valid-jsdoc": ["error"],
        "no-shadow" : "off",
        "max-len": ["error", {"code": 150, "ignoreStrings": true, "ignoreUrls": true}],
        "consistent-return" : "off",
        "func-style":"off",
        "max-statements":"off"
    }
};