import {join} from 'node:path'

import type CreateCommand from '../commands/create.js'

export default async function writeSrcTask(command: CreateCommand) {
  command.context.stdout.write(`Writing src/**/*... \n`)

  if (command.support.includes(`react`)) {
    return await command.fs.copy(
      join(command.createRoot, `templates`, `react`, `src`),
      `src`,
    )
  }

  if (command.support.includes(`vue`)) {
    return await command.fs.copy(
      join(command.createRoot, `templates`, `vue`, `src`),
      `src`,
    )
  }

  await command.fs.copy(
    join(command.createRoot, `templates`, `default`, `src`),
    `src`,
  )
}
