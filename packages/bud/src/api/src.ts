import {Api} from '@roots/bud-typings'

const src: Api.Src = function (path?: string): string {
  const srcDir = this.paths.get('src')
  return path ? this.fs.join(srcDir, path) : srcDir
}

export {src}
