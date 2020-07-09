/**
 * Development server settings
 * @typedef {function (mode: object) => {bud: typeof import('../index')}} dev
 * @param   {object} options
 * @return  {typeof import('./../index')} bud
 */
const dev = options => {
  this.options.dev = {
    ...this.options.dev,
    ...options,
  }

  return this
}

export {dev}
