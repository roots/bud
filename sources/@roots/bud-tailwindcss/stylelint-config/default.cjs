module.exports = {
  rules: {
    ...require('./common'),
    'at-rule-no-unknown': require('./rules/at-rule-no-unknown'),
  },
}
