import {join} from 'node:path'

import type CreateCommand from '../commands/create.js'
import formatSource from '../utilities/formatSource.js'
import templateEngine from '../utilities/templateEngine.js'

export default async function writeConfigTask(command: CreateCommand) {
  const spinner = command.createSpinner()
  spinner.start(`Writing bud config...`)

  if (!command.overwrite && command.exists(`bud.config`)) {
    return spinner.warn(`bud config already exists. skipping write task.`)
  }

  try {
    const isTs =
      command.support.includes(`typescript`) ||
      command.support.includes(`swc`)
    const isReact = command.support.includes(`react`)

    const scriptExtension = isReact && isTs ? `tsx` : isTs ? `ts` : `js`
    const styleExtension = command.support.includes(`sass`)
      ? `scss`
      : `css`

    const source = await command.fs.read(
      join(command.createRoot, `templates`, `bud.config.ts.hbs`),
      `utf8`,
    )

    const template = templateEngine.compile(source)

    const result = template({
      scriptExtension,
      styleExtension,
      html: command.html,
      proxy: command.support.includes(`wordpress`),
    })

    await command.fs.write(
      `bud.config.ts`,
      formatSource(result, {parser: `typescript`}),
    )

    spinner.succeed()
  } catch (error) {
    spinner.fail()
    throw error
  }
}
