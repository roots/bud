module.exports = {
  rules: {
    ...require('./rules/common'),
    'at-rule-no-unknown': require('./rules/at-rule-no-unknown'),
  },
}
