/**
 * Sage stylelint config
 */
module.exports = {
  extends: [
    require.resolve(`@roots/bud-stylelint/config`),
    require.resolve(`@roots/bud-preset-wordpress/stylelint-config`),
  ],
  rules: {
    'at-rule-empty-line-before': null,
    'no-descending-specificity': null,
    'no-empty-source': null,
    'selector-class-pattern': null,
    'selector-id-pattern': null,
  },
}
