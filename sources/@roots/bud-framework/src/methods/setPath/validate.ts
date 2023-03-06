import {isAbsolute} from 'node:path'

import isString from '@roots/bud-support/lodash/isString'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

import type {Parameters} from './setPath.js'

export const all = (parameters: Parameters): Parameters => {
  if (isUndefined(parameters[0])) {
    const error = new Error(
      `No parameters provided.\n\nDocs: https://bud.js.org/docs/bud.setPath`,
    )
    error.name = `bud.setPath`
    throw error
  }

  return parameters
}

export const baseDir = ([basedir]: [string]): string => {
  if (!isAbsolute(basedir)) {
    const error = new Error(
      `When only one parameter is provided, it must be an absolute path.\n\nDocs: https://bud.js.org/docs/bud.setPath`,
    )
    error.name = `bud.setPath`
    throw error
  }

  return basedir
}

export const stringPair = ([key, value]: [string, string]) => {
  if (!isString(value)) {
    const error = new Error(
      [
        `Tried to set path with a non-string value`,
        `Path value must be a string. Received \`${typeof value}\``,
        `Docs: https://bud.js.org/docs/bud.setPath`,
      ].join(`\n\n`),
    )
    error.name = `bud.setPath`
    throw error
  }

  if (!isString(key)) {
    const error = new Error(
      [
        `Tried to set path with a non-string key`,
        `Path label must be a string. Received \`${typeof key}\`.`,
        `Docs: https://bud.js.org/docs/bud.setPath`,
      ].join(`\n\n`),
    )
    error.name = `bud.setPath`
    throw error
  }

  return [key, value]
}
