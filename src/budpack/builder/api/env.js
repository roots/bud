/**
 * Get environment variable value.
 * @example bud.env('APP_NAME')
 * @typedef {function () => {string} env
 * @param   {string} key
 * @return  {string}
 */
const env = function (key) {
  return this.options.env[key]
    ? this.options.env[key]
    : null
}

export {env}
