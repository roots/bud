import {join} from 'node:path'

import type CreateCommand from '../commands/create.js'

export default async function writeSrcTask(command: CreateCommand) {
  const spinner = command.createSpinner()
  spinner.start(`Writing src...`)

  if (!command.overwrite && command.exists(`src`)) {
    return spinner.warn(`src already exists. skipping write task.`)
  }

  try {
    const isReact = command.support.includes(`react`)
    const isVue = command.support.includes(`vue`)
    const isTs =
      command.support.includes(`typescript`) ||
      command.support.includes(`swc`)
    const isSass = command.support.includes(`sass`)

    const scriptExtension = isReact && isTs ? `tsx` : isTs ? `ts` : `js`
    const styleExtension = isSass ? `scss` : `css`

    if (isReact) {
      await command.fs.copy(
        join(command.createRoot, `templates`, `react`, `index.js.hbs`),
        join(`src`, `index.${scriptExtension}`),
        {overwrite: true},
      )
      await command.fs.copy(
        join(command.createRoot, `templates`, `react`, `index.css.hbs`),
        join(`src`, `index.${styleExtension}`),
      )
      await command.fs.copy(
        join(
          command.createRoot,
          `templates`,
          `react`,
          `components`,
          `App.js.hbs`,
        ),
        join(`src`, `components`, `App.${scriptExtension}`),
      )
      await command.fs.copy(
        join(command.createRoot, `templates`, `react`, `logo.svg.hbs`),
        join(`src`, `logo.svg`),
      )
      return spinner.succeed()
    }

    if (isVue) {
      await command.fs.copy(
        join(command.createRoot, `templates`, `vue`, `index.js.hbs`),
        join(`src`, `index.${scriptExtension}`),
        {overwrite: true},
      )
      await command.fs.copy(
        join(command.createRoot, `templates`, `vue`, `index.css.hbs`),
        join(`src`, `index.${styleExtension}`),
      )
      await command.fs.copy(
        join(
          command.createRoot,
          `templates`,
          `vue`,
          `components`,
          `app.vue.hbs`,
        ),
        join(`src`, `components`, `app.vue`),
      )
      await command.fs.copy(
        join(
          command.createRoot,
          `templates`,
          `vue`,
          `components`,
          `logo.svg.vue.hbs`,
        ),
        join(`src`, `components`, `logo.svg.vue`),
      )
      return spinner.succeed()
    }

    await command.fs.copy(
      join(command.createRoot, `templates`, `vanilla`, `index.js.hbs`),
      join(`src`, `index.${scriptExtension}`),
      {overwrite: true},
    )
    await command.fs.copy(
      join(command.createRoot, `templates`, `vanilla`, `index.css.hbs`),
      join(`src`, `index.${styleExtension}`),
    )
    await command.fs.copy(
      join(command.createRoot, `templates`, `vanilla`, `logo.svg.hbs`),
      join(`src`, `logo.svg`),
    )
    spinner.succeed()
  } catch (error) {
    spinner.fail()
    throw error
  }
}
