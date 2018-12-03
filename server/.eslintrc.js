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
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
        "import/no-unassigned-import": "error",
        "import/order": ["error", {"newlines-between": "always"}],
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
        "filenames/match-regex": [2, "^[a-z_-]+$", true],
        "func-style":"off",
        "max-statements":"off"
    }
};