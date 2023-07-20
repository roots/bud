export default {
  arrowParens: `avoid`,
  bracketSpacing: false,
  overrides: [
    {
      files: `*.mdx`,
      options: {
        parser: `mdx`,
      },
    },
    {
      files: `*.d.ts`,
      options: {
        parser: `typescript`,
      },
    },
  ],
  printWidth: 75,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: `all`,
  useTabs: false,
}
