import {join} from 'node:path'

import type CreateCommand from '../commands/create.js'
import templateEngine from '../utilities/templateEngine.js'

export default async function writePackageManifest(
  command: CreateCommand,
) {
  const spinner = command.createSpinner()
  spinner.start(`Writing README.md...`)

  const source = await command.fs.read(
    join(command.createRoot, `templates`, `default`, `README.md`),
    `utf8`,
  )

  const template = templateEngine.compile(source)

  const result = template({
    name: command.name,
    description: command.description,
    username: command.username,
    license: command.license,
    version: command.version,
  })

  await command.fs.write(`README.md`, result)

  spinner.succeed()
}
