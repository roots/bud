module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: false,
  tabWidth: 2,
  printWidth: 70,
  singleQuote: true,
  jsxBracketSameLine: true,
  useTabs: false,
  quote: 'single',
  trailingComma: 'all',
  semi: false,
  overrides: [
    {
      files: ['*.md'],
      options: {
        parser: 'markdown',
      },
    },
    {
      files: ['*.json'],
      options: {
        parser: 'json',
      },
    },
  ],
}
