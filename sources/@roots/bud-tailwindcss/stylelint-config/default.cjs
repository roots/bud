module.exports = {
  rules: {
    ...require('./common.cjs'),
    'at-rule-no-unknown': require('./rules/at-rule-no-unknown.cjs'),
  },
}
