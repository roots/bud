import {Bud} from '@roots/bud-typings'

export const dist = function (
  this: Bud.Contract,
  path?: string,
): string {
  return path
    ? this.fs.path.join(this.config.get('output.path'), path)
    : this.config.get('output.path')
}
