import {
  React,
  render,
  fs,
  lodash,
  globby,
  chalk,
} from '@roots/bud-support'
import {Error, Publish} from '@roots/bud-dashboard'
import {join, dirname} from 'path'

const cwd = process.cwd()

const publishables = [
  ...globby
    .sync(['*/bud-*/publish/*', '*/*/bud-*/publish/*'])
    .filter(
      (value, index, self) => self.indexOf(value) === index,
    ),
]

export const describe = `Publish a template to your project.\n${publishables.reduce(
  (a, file) => {
    const ext = dirname(dirname(file)).replace(
      'node_modules/',
      '',
    )

    const template = file
      .replace(`${ext}/publish/`, '')
      .replace('node_modules/', '')

    return `${a} \n${chalk.blue(ext)} ${chalk.green(
      template,
    )}   ${chalk.dim(`bud publish ${ext} ${template}`)}`
  },
  ``,
)}`

export const builder = yargs =>
  yargs
    .positional('file', {
      describe: 'template file to publish',
      type: 'string',
    })
    .usage('sage publish <file>')

export const handler = ({_}): void => {
  ;(async () => {
    const extension: string = lodash.isNumber(_[1])
      ? _[1].toString()
      : _[1]

    const template: string = lodash.isNumber(_[2])
      ? _[2].toString()
      : _[2]

    /**
     * Bail early if command isn't proper.
     *
     * Hit the user with an error message
     * so they know what they did wrong
     */
    if (!extension || typeof extension !== 'string') {
      Error(
        `Try \`sage publish --help\` for a list of available templates.`,
        `You must specify a template to publish`,
      )
    }

    const src = `${process.cwd()}/node_modules/${extension}/publish/${template}`
    const dest = join(cwd, 'publish', `${template}`)

    try {
      await fs.ensureDir(dirname(dest))
      await fs.copyFile(src, dest)

      render(<Publish file={template} />)
    } catch (err) {
      Error(
        `Are you sure you got the name right? Try \`sage or sage publish --help\` for a list of available srcFiles.`,
        `The requested template can't be published.`,
      )
    }
  })()
}
