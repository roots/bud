/**
 * Get environment variable value.
 * @example bud.env('APP_NAME')
 * @param   {string} key
 * @return  {string}
 */
const env = function (key): any {
  return this.state.options.env[key]
    ? this.state.options.env[key]
    : null
}

export {env}
