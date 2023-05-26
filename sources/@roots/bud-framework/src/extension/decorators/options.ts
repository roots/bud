import isUndefined from '@roots/bud-support/lodash/isUndefined'
import upperFirst from '@roots/bud-support/lodash/upperFirst'

import type {OptionsMap} from '../index.js'

const noPropertyDefined = (obj: any, key: string): boolean => {
  const noGetterDefined = isUndefined(obj[`get ${key}`])
  const noSetterDefined = isUndefined(obj[`set ${key}`])
  const noPropertyDefined = isUndefined(obj[key])

  return [noGetterDefined, noSetterDefined, noPropertyDefined].every(
    bool => bool === true,
  )
}

export const options =
  <Options = any>(options: OptionsMap<Options>) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public constructor(...args: any[]) {
        super(...args)

        Object.keys(options).forEach(key => {
          if (noPropertyDefined(this, key)) {
            Object.defineProperty(this, key, {
              get: () => this.get(key),
              set: value => this.set(key, value),
            })
          }

          const setFn = `set${upperFirst(key)}`
          if (noPropertyDefined(this, setFn)) {
            Object.defineProperty(this, setFn, {
              value: (value: any) => {
                this.set(key, value)
                return this
              },
            })
          }

          const getFn = `get${upperFirst(key)}`
          if (noPropertyDefined(this, getFn)) {
            Object.defineProperty(this, getFn, {
              value: () => this.get(key),
            })
          }
        })

        this.setOptions(options)
      }
    }
