import {join} from 'node:path'

import type CreateCommand from '../commands/create.js'

export default async function writeSrcTask(command: CreateCommand) {
  const spinner = command.createSpinner()
  spinner.start(`Writing src/**/*...`)

  if (!command.overwrite && command.exists(`src`)) {
    return spinner.warn(`src already exists. skipping write task.`)
  }

  try {
    if (command.support.includes(`react`)) {
      await command.fs.copy(
        join(command.createRoot, `templates`, `react`, `src`),
        `src`,
        {overwrite: true},
      )
      return spinner.succeed()
    }

    if (command.support.includes(`vue`)) {
      await command.fs.copy(
        join(command.createRoot, `templates`, `vue`, `src`),
        `src`,
        {overwrite: true},
      )
      return spinner.succeed()
    }

    await command.fs.copy(
      join(command.createRoot, `templates`, `default`, `src`),
      `src`,
      {overwrite: true},
    )
    spinner.succeed()
  } catch (error) {
    spinner.fail()
    throw error
  }
}