/**
 * @todo env
 */
const env = function (key: string | number): any {
  return this.state.options.get('env')[key] ?? null
}

export {env}
