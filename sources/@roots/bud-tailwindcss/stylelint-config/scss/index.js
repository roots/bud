module.exports = {
  rules: {
    ...require('../base'),
    'no-invalid-position-at-import-rule': null,
    'scss/at-rule-no-unknown': require('../rules/at-rule-no-unknown'),
  },
};
