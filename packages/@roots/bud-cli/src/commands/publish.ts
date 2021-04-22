import fs from 'fs-extra'
import {join, dirname} from 'path'
import {Command} from '../Command'

/**
 * Publish
 */
export class Publish extends Command {
  /**
   * Name
   */
  public name = 'publish'

  /**
   * Signature
   */
  public get signature() {
    return `<pkg> <scaffold> [dir]`
  }

  /**
   * Description
   */
  public description = `Publish a file to your project.`

  /**
   * Arguments
   */
  public get arguments() {
    return {
      pkg: 'Source package',
      scaffold: 'File to publish',
      dir: 'Path to publish to',
    }
  }

  /**
   * Action
   */
  public action(pkg: string, scaffold: string, dir: string) {
    ;(async () => {
      const src = join(
        process.cwd(),
        'node_modules',
        pkg,
        'publish',
        scaffold,
      )

      const dest = join(
        process.cwd(),
        dir ?? `publish`,
        scaffold,
      )

      try {
        await fs.ensureDir(dirname(dest))
        await fs.copyFile(src, dest)

        console.log(scaffold)
      } catch (err) {
        console.error(err)
      }
    })()
  }
}
