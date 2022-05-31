module.exports = {
  rules: {
    ...require('./common'),
    'no-invalid-position-at-import-rule': null,
    'at-rule-no-unknown': require('./rules/at-rule-no-unknown'),
    'scss/at-rule-no-unknown': require('./rules/at-rule-no-unknown'),
  },
}
