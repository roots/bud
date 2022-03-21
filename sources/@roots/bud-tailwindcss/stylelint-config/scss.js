module.exports = {
  rules: {
    ...require('./common'),
    'scss/at-rule-no-unknown': require('./rules/at-rule-no-unknown'),
  },
}
