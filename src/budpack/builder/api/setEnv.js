/**
 * Set environment variables.
 * @example bud.setEnv({APP_NAME: 'sage'})
 * @typedef {function ({[envvar: string]: value: string[]}) => {bud: import('../index')}} setEnv
 * @param   {{[envvar: string]: {value: string}}} options
 * @return  {import('../index')}
 */
const setEnv = function (options) {
  this.options.env = {
    ...this.options.env,
    ...options,
  }

  return this
}

export {setEnv}
