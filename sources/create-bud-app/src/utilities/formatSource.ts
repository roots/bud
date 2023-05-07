import {format, Options} from 'prettier'

export default (code: string, options: Partial<Options> = {}) => {
  return format(code, {
    parser: `babel`,
    bracketSpacing: false,
    tabWidth: 2,
    printWidth: 75,
    singleQuote: true,
    useTabs: false,
    trailingComma: `all`,
    ...options,
  })
}
