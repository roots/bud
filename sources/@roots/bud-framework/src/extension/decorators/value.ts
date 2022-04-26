import {lodash} from '@roots/bud-support'

const {isFunction, upperFirst} = lodash

export const value =
  <Value = any, Signature extends {[key: string]: any} = any>(
    prop: string,
    value?: Value,
  ) =>
  <
    Type extends {
      new (...args: any[]): {[key: string]: Signature & any}
    },
  >(
    constructor: Type,
  ) => {
    const applicative = {
      [`_${prop}`]: value ?? null,
      [`get${upperFirst(prop)}`]: function (): Value {
        return this[value]
      },
      [`set${upperFirst(prop)}`]: function (value: Value) {
        this[value] = value
        return this
      },
    }

    return class extends constructor {
      public constructor(...args: any[]) {
        super(...args)

        Object.assign(
          this,
          Object.entries(applicative).reduce(
            (a, [k, v]) => ({
              ...a,
              [k]: isFunction(v) ? v.bind(this) : v,
            }),
            {},
          ),
        )

        Object.defineProperty(this, prop, {
          get: (() =>
            function () {
              return isFunction(this[`_${prop}`])
                ? this[`_${prop}`](this.app)
                : this[`_${prop}`]
            }.bind(this))(),

          set: (() =>
            function (value: Value) {
              this[`_${prop}`] = value
            }.bind(this))(),
        })
      }
    }
  }
