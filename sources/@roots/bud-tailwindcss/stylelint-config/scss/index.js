module.exports = {
  rules: {
    ...require('../base'),
    'scss/at-rule-no-unknown': require('../rules/at-rule-no-unknown'),
  },
}
