module.exports = {
  extends: [require.resolve('@roots/bud-stylelint/config')],
  rules: {
    'string-quotes': null,
    'selector-class-pattern': null,
    'declaration-colon-newline-after': null,
    'value-list-comma-newline-after': null,
    'no-empty-source': null,
    'no-descending-specificity': null,
    'at-rule-empty-line-before': null,
  },
}
