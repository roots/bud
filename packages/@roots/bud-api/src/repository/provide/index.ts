import type {Repository} from '../'

export const provide: Repository.Provide = function (packages) {
  this.hooks.on(
    'extension/webpack-provide-plugin/options',
    (provided: Repository.Provide.Provided) => ({
      ...provided,
      ...Object.entries(packages).reduce(
        (a, [k, v]) => ({
          ...a,
          ...(!Array.isArray(v)
            ? {[v]: k}
            : {
                ...a,
                ...v.reduce(
                  (a, pkg) => ({
                    ...a,
                    [pkg]: k,
                  }),
                  {},
                ),
              }),
        }),
        {},
      ),
    }),
  )

  return this
}
