module.exports = {
    env: {
        browser: true,
        es6: true,
        jquery: true
    },
    extends: ["eslint:recommended", "p5js", "p5js/dom"],
    parserOptions: {
        ecmaVersion: 2015
    },
    globals: {
        _: true
    },
    rules: {
        "arrow-body-style": ["error", "always"],
        "block-scoped-var": 2,
        "camelcase": 2,
        "curly": 2,
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "new-cap": 0,
        "no-console": 2,
        "no-debugger": 2,
        "no-caller": 2,
        "no-undef": 2,
        "no-empty": ["error", {
            allowEmptyCatch: true
        }],
        "no-const-assign": 2,
        "no-var": 2,
        "prefer-const": 2,
        "template-curly-spacing": ["error", "never"]
    }
};