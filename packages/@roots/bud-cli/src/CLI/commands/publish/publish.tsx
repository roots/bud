import {React, render, fs} from '@roots/bud-support'
import {Error, Publish} from '@roots/bud-dashboard'
import {join, dirname} from 'path'

/**
 * [command] publish
 */
export const command = 'publish [extension] [file] [dir]'

export const describe = `Publish a file to your project.`

export const builder = yargs => {
  return yargs
    .example(`publish:list`, 'List available templates')
    .example(
      `publish @roots/bud-support bud.config.js`,
      'Publish a starter bud configuration file',
    )
    .example(
      `publish @roots/bud-support index.html`,
      'Publish a starter HTML template',
    )
    .positional('extension', {
      describe: 'Source extension',
      required: true,
      type: 'string',
    })
    .positional('file', {
      describe: 'File to publish',
      required: true,
      type: 'string',
    })
    .positional('dir', {
      describe: 'Path to publish to',
      default: 'publish',
      type: 'string',
    })
    .demand(['extension, file'])
}

export const handler = args => {
  ;(async () => {
    const ext: string = args._['extension'].toString()
    const file: string = args._['file'].toString()
    const dir: string = args._['dir'].toString()

    const src = join(
      process.cwd(),
      'node_modules',
      ext,
      'publish',
      file,
    )

    const dest = join(process.cwd(), dir ?? `publish`, file)

    try {
      await fs.ensureDir(dirname(dest))
      await fs.copyFile(src, dest)

      render(<Publish file={file} />)
    } catch (err) {
      console.log(err)

      Error(
        `Are you sure you got the name right? Try \`bud publish:list\` for a list of available files.`,
        `The requested file can't be published.`,
      )
    }
  })()
}
