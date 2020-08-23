import type {Src} from './types'

const src: Src = function (path?: string): string {
  const srcDir = this.paths.get('src')
  return path ? this.fs.path.join(srcDir, path) : srcDir
}

export {src}
