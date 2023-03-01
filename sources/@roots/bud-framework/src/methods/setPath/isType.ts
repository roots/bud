import type {Parameters} from './setPath.js'

export const baseDir = (params: Parameters): params is [string] => {
  return params.length < 2 && typeof params[0] === `string`
}

export const stringPair = (
  params: Parameters,
): params is [string, string] => {
  return params.length === 2
}

export const pathMap = (
  params: Parameters,
): params is [Record<string, string>] => {
  return params.length === 1 && typeof params[0] === `object`
}
