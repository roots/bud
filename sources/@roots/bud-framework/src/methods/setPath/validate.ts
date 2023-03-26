import {isAbsolute} from 'node:path'

import {InputError} from '@roots/bud-support/errors'
import isString from '@roots/bud-support/lodash/isString'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

import type {Parameters} from './setPath.js'

export const all = (parameters: Parameters): Parameters => {
  if (isUndefined(parameters[0])) {
    throw new InputError(`bud.setPath: no parameters provided`, {
      props: {
        details: `At least one parameter must be provided.`,
        thrownBy: `bud.setPath`,
        docs: new URL(`https://bud.js.org/docs/bud.setPath`),
      },
    })
  }

  return parameters
}

export const baseDir = ([basedir]: [string]): string => {
  if (!isAbsolute(basedir)) {
    throw new InputError(
      `bud.setPath: when only one parameter is provided, it must be an absolute path.`,
      {
        props: {
          details: `The provided path is not absolute. Received \`${basedir}\`. This will be used as the base directory for all other paths.`,
          thrownBy: `bud.setPath`,
          docs: new URL(`https://bud.js.org/docs/bud.setPath`),
        },
      },
    )
  }

  return basedir
}

export const stringPair = ([key, value]: [string, string]) => {
  if (!isString(value)) {
    throw new InputError(
      `bud.setPath: tried to set path with a non-string value`,
      {
        props: {
          details: `Path value must be a string. Received \`${typeof value}\``,
          thrownBy: `bud.setPath`,
          docs: new URL(`https://bud.js.org/docs/bud.setPath`),
        },
      },
    )
  }

  if (!isString(key)) {
    throw new InputError(
      `bud.setPath: Tried to set path with a non-string key`,
      {
        props: {
          details: `Path label must be a string. Received \`${typeof key}\``,
          thrownBy: `bud.setPath`,
          docs: new URL(`https://bud.js.org/docs/bud.setPath`),
        },
      },
    )
  }

  return [key, value]
}
