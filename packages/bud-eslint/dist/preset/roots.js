"use strict";
module.exports = {
    extends: ['eslint:recommended'],
    parser: require.resolve('babel-eslint'),
    parserOptions: {
        ecmaVersion: 2018,
    },
    env: {
        browser: true,
        node: true,
    },
    rules: {
        strict: 0,
        'no-console': 0,
        'no-extra-semi': 0,
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'ignore',
            },
        ],
    },
};
//# sourceMappingURL=roots.js.map