import {join} from 'node:path'

import type CreateCommand from '../commands/create.js'
import templateEngine from '../utilities/templateEngine.js'

export default async function writeConfigTask(command: CreateCommand) {
  const spinner = command.createSpinner()
  spinner.start(`Writing bud.config.ts...`)

  const source = await command.fs.read(
    join(command.createRoot, `templates`, `default`, `bud.config.ts`),
    `utf8`,
  )

  const template = templateEngine.compile(source)

  const result = template({
    name: command.name,
    username: command.username,
    license: command.license,
    version: command.version,
  })

  await command.fs.write(`bud.config.ts`, result)

  spinner.succeed()
}
