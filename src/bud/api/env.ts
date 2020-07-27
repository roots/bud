/**
 * Get environment variable value.
 *
 * ```js
 * bud.env('APP_NAME')
 * ```
 *
 * @param   {string} key
 * @return  {string}
 */
const env = function (key: string | number): any {
  return this.state.options.env[key]
    ? this.state.options.env[key]
    : null
}

export {env}
