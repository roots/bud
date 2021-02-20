import {Api} from '@roots/bud-typings'

export const string: Api.Stringify = function (string) {
  return JSON.stringify(string)
}
