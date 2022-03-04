module.exports = {
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'extend',
          'at-root',
          'debug',
          'warn',
          'error',
          'if',
          'else',
          'for',
          'each',
          'while',
          'mixin',
          'include',
          'content',
          'return',
          'tailwind',
          'apply',
          'responsive',
          'variants',
          'screen',
          'function',
          'use',
          'forward',
          'layer',
        ],
      },
    ],
    "function-no-unknown": [
      true,
      {
        "ignoreFunctions": [
          "theme",
        ],
      },
    ],
  },
}
