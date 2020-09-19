import path from 'path'
import filesystem from 'fs-extra'
import globby from 'globby'
import resolveFrom from 'resolve-from'

import Container from '@roots/container'
import watcher from './watcher'

export interface Loose {
  [key: string]: any | any[] | undefined | CallableFunction
}

/** File container */
class FileContainer extends Container {
  public fs: typeof filesystem = filesystem
  public glob: typeof globby = globby
  public path: typeof path = path
  public from: typeof resolveFrom = resolveFrom
  public watcher: typeof watcher = watcher
  public base: string = process.cwd()

  constructor(baseDir?: string) {
    super()

    this.setBase = this.setBase.bind(this)
    this.require = this.require.bind(this)
    this.exists = this.exists.bind(this)
    this.setDisk = this.setDisk.bind(this)

    if (baseDir) {
      this.setBase(baseDir)
    }
  }

  setBase(dir: string): void {
    this.base = dir
  }

  require(key: string): any {
    return require(this.get(key))
  }

  exists(key: string): boolean {
    return this.fs.existsSync(this.get(key))
  }

  setDisk(glob: string[]): void {
    const files = this.glob.sync(glob, {gitignore: true})

    this.repository = files.reduce(
      (acc: any, curr: any) => ({
        ...acc,
        [curr.replace(`${this.base}/`, '')]: curr,
      }),
      {},
    )
  }

  get(this: FileContainer, key: string): any {
    return this.repository[key]
  }

  resolve(this: FileContainer, key: string): any {
    return require(resolveFrom(this.base, this.get(key)))
  }

  project(key: string): string {
    return this.path.resolve(this.base, key)
  }

  read(key: string): string {
    return this.fs.readFileSync(this.get(key), 'utf8')
  }

  readJson(key: string): any {
    return this.fs.readJsonSync(this.get(key))
  }

  write(key: string, content: string): void {
    this.fs.writeFileSync(
      this.path.resolve(this.base, key),
      content,
    )
  }

  writeJson(key: string, content: string): void {
    this.fs.writeJsonSync(
      this.path.resolve(this.base, key),
      content,
    )
  }
}

export {FileContainer as default}
