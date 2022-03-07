module.exports = {
  rules: {
    ...require('./base'),
    'at-rule-no-unknown': require('./rules/at-rule-no-unknown'),
  },
}
