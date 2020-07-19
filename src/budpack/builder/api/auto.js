/**
 * Automatically load modules instead of needing to import them.
 * @example bud.auto({jquery: ['$', 'window.jQuery']})
 * @param   {{[key: string]: {modules: string[]}}} options
 * @return  {typeof import('./../index')} bud */
const auto = function (options) {
  Object.entries(options).forEach(([key, modules]) => {
    modules.forEach(handle => {
      this.options.auto = {
        ...this.options.auto,
        [handle]: key,
      }
    })
  })

  return this
}

export {auto}
