/**
 * @todo env
 */
const env = function (key: string | number): any {
  return this.state.options.env[key]
    ? this.state.options.env[key]
    : null
}

export {env}
