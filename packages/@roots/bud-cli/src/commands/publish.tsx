import {React, render, fs} from '@roots/bud-support'
import {
  Error,
  Publish as PublishComponent,
} from '@roots/bud-dashboard'
import {join, dirname} from 'path'
import BaseCommand from '../Command'

/**
 * Publish
 */
export class Publish extends BaseCommand {
  public name = 'publish'

  public signature = `<pkg> <scaffold> [dir]`

  public description = `Publish a file to your project.`

  public arguments = {
    pkg: 'Source package',
    scaffold: 'File to publish',
    dir: 'Path to publish to',
  }

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

        render(<PublishComponent file={scaffold} />)
      } catch (err) {
        Error(err, `The requested file can't be published.`)
      }
    })()
  }
}
