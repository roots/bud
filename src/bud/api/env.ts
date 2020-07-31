/**
 * @todo env
 */
const env = function (key: string | number): any {
  return this.options.get('env')[key] ?? null
}

export {env}
