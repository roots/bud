import {React, render, fs} from '@roots/bud-support'
import {Error, Publish} from '@roots/bud-dashboard'
import {join, dirname} from 'path'
import BaseCommand from '../Command'

/**
 * Publish
 */
export default class Command extends BaseCommand {
  public name = 'publish'

  public signature = `<pkg> <scaffold> [dir]`

  public description = `Publish a file to your project.`

  public arguments = {
    pkg: 'Source package',
    scaffold: 'File to publish',
    dir: 'Path to publish to',
  }

  public action(pkg, scaffold, dir, command) {
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

        render(<Publish file={scaffold} />)
      } catch (err) {
        Error(err, `The requested file can't be published.`)
      }
    })()
  }
}
