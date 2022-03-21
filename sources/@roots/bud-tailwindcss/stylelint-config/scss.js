module.exports = {
  rules: {
    ...require('./rules/common'),
    'scss/at-rule-no-unknown': require('./rules/at-rule-no-unknown'),
  },
}