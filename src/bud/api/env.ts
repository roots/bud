/**
 * Get environment variable value.
 * @example bud.env('APP_NAME')
 * @param   {string} key
 * @return  {string}
 */
const env = function (key): any {
  return this.options.env[key]
    ? this.options.env[key]
    : null
}

export {env}
