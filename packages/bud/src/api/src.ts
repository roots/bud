import {PathGetter} from './types'

const src: PathGetter = function (path: string): string {
  const srcDir = this.paths.get('src')
  return path ? this.fs.join(srcDir, path) : srcDir
}

export {src}
