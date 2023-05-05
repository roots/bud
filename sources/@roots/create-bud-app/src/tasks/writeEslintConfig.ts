import {join} from 'node:path'

import type CreateCommand from '../commands/create.js'
import templateEngine from '../utilities/templateEngine.js'

export default async function writeConfigTask(command: CreateCommand) {
  command.context.stdout.write(`Writing eslint.config.js... \n`)

  const type = command.support.includes(`react`) ? `react` : `default`

  const source = await command.fs.read(
    join(command.createRoot, `templates`, type, `eslint.config.js`),
    `utf8`,
  )

  const template = templateEngine.compile(source)

  const result = template({
    name: command.name,
    username: command.username,
    license: command.license,
    version: command.version,
  })

  await command.fs.write(`eslint.config.js`, result)
}
