module.exports = {
  rules: {
    ...require('./common.cjs'),
    'no-invalid-position-at-import-rule': null,
    'at-rule-no-unknown': require('./rules/at-rule-no-unknown.cjs'),
    'scss/at-rule-no-unknown': require('./rules/at-rule-no-unknown.cjs'),
  },
}
