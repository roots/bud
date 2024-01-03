module.exports = {
  extends: [
    `@roots/bud-stylelint/config`,
    `stylelint-config-recommended-scss`,
  ],
  rules: {
    'custom-property-pattern': [
      '^([a-z][a-z0-9]*)(-{1,2}[a-z0-9]+)*$',
      {
        message: name => `Expected custom property name "${name}" to be kebab-case`,
      },
    ],
  },
}
