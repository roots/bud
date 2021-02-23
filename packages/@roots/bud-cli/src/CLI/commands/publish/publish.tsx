import {React, render, fs} from '@roots/bud-support'
import {Error, Publish} from '@roots/bud-dashboard'
import {join, dirname} from 'path'

/**
 * [command] publish
 */
export const cmd = CLI => ({
  command: 'publish [extension] [file] [dir]',

  describe: `Publish a file to your project.`,

  builder: yargs => {
    return yargs
      .positional('extension', {
        describe: 'Source extension',
        required: true,
      })
      .positional('file', {
        describe: 'File to publish',
        required: true,
      })
      .positional('dir', {
        describe: 'Path to publish to',
        default: 'publish',
        required: false,
      })
      .demand(['extension, file'])
  },

  handler: (args: {_: (string | number)[]}): void => {
    ;(async () => {
      const ext: string = args._['extension'].toString()
      const file: string = args._['file'].toString()
      const dir: string = args._['dir'].toString()

      const src = join(
        CLI.cwd,
        'node_modules',
        ext,
        'publish',
        file,
      )

      const dest = join(CLI.cwd, dir ?? `publish`, file)

      try {
        await fs.ensureDir(dirname(dest))
        await fs.copyFile(src, dest)

        render(<Publish file={file} />)
      } catch (err) {
        console.log(err)

        Error(
          `Are you sure you got the name right? Try \`${CLI.command} publish:list\` for a list of available files.`,
          `The requested file can't be published.`,
        )
      }
    })()
  },
})
