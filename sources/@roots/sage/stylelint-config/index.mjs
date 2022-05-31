/**
 * Sage default stylelint config
 *
 * @public
 */
export default {
  extends: [
    '@roots/bud-stylelint/config',
    '@roots/bud-preset-wordpress/stylelint-config',
  ],
  rules: {
    'at-rule-empty-line-before': null,
    'declaration-colon-newline-after': null,
    'no-descending-specificity': null,
    'no-empty-source': null,
    'selector-class-pattern': null,
    'selector-id-pattern': null,
    'string-quotes': null,
    'value-list-comma-newline-after': null,
  },
}
