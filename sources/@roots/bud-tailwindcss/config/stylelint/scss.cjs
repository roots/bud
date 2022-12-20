module.exports = {
  rules: {
    ...require(`./common.cjs`),
    'at-rule-no-unknown': require(`./rules/at-rule-no-unknown.cjs`),
    'no-invalid-position-at-import-rule': null,
    'scss/at-rule-no-unknown': require(`./rules/at-rule-no-unknown.cjs`),
  },
}
