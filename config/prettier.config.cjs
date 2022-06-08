module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: false,
  tabWidth: 2,
  printWidth: 75,
  singleQuote: true,
  useTabs: false,
  trailingComma: 'all',
  semi: false,
  overrides: [
    {
      files: '*.mdx',
      options: {
        parser: 'mdx',
      },
    },
    {
      files: '*.d.ts',
      options: {
        parser: 'typescript',
      },
    },
  ],
}
