import {join} from 'node:path'

import type CreateCommand from '../commands/create.js'
import templateEngine from '../utilities/templateEngine.js'

export default async function writeTsConfig(command: CreateCommand) {
  command.context.stdout.write(`Writing tsconfig.json... \n`)

  const source = await command.fs.read(
    join(command.createRoot, `templates`, `default`, `tsconfig.json`),
    `utf8`,
  )

  const template = templateEngine.compile(source)

  const result = template({
    name: command.name,
    username: command.username,
    license: command.license,
    version: command.version,
  })

  await command.fs.write(`tsconfig.json`, result)
}
