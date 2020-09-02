import {Api} from '@roots/bud-typings'

const src: Api.Src = function (path?: string): string {
  return path
    ? this.fs.resolve(this.paths.get('src'), path)
    : this.paths.get('src')
}

export {src}
