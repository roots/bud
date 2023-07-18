import type {Options} from 'prettier'

import {format} from 'prettier'

export default async (code: string, options: Partial<Options> = {}) => {
  return await format(code, {
    bracketSpacing: false,
    parser: `babel`,
    printWidth: 75,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: `all`,
    useTabs: false,
    ...options,
  })
}
