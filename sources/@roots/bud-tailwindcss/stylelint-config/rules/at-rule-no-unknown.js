/**
 * at-rule-no-unknown
 *
 * @see {@link https://github.com/roots/bud/issues/1226}
 */
module.exports = [
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
]
