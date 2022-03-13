module.exports = {
  'at-rule-no-unknown': require('./rules/at-rule-no-unknown'),
  'function-no-unknown': [
    true,
    {
      ignoreFunctions: ['theme'],
    },
  ],
};
