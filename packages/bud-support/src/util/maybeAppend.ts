import {isEqual, join} from 'lodash'

const lastChar = (str: string): string =>
  str.charAt(str.length - 1)

export const maybeAppend = (str: string, char: string): string =>
  !isEqual(lastChar(str), char) ? join([str, char]) : str
