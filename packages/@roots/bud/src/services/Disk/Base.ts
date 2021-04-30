import {Service} from '@roots/bud-framework'
import {FileContainer} from '@roots/filesystem'

export default abstract class extends Service {
  public name = 'disk'

  private _baseDir: string = process.cwd()

  public get baseDir(): string {
    return this._baseDir
  }

  public set baseDir(baseDir: string) {
    this._baseDir = baseDir
  }

  private _pattern: string[] = [
    '**/*',
    '*',
    '!vendor',
    '!node_modules',
  ]

  public get pattern(): string[] {
    return this._pattern
  }

  public set pattern(glob: string[]) {
    this._pattern = glob
  }

  public abstract register(): void

  public abstract boot(): void

  public abstract make(
    key: string | number,
    options: {baseDir?: string; glob?: string[]},
  ): FileContainer

  protected abstract makeFileContainer(options: {
    baseDir?: string
    glob?: string[]
  }): FileContainer
}
