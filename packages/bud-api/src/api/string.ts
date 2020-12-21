import {Framework} from '@roots/bud-typings'

export const string: Stringify = function (string) {
  return JSON.stringify(string)
}

export type Stringify = (
  this: Framework,
  string: unknown,
) => string
