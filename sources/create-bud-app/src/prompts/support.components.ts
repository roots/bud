/* eslint-disable no-console */
// @ts-ignore
import MultiSelect from 'enquirer/lib/prompts/multiselect.js'

import type CreateCommand from '../commands/create.js'

const choices = {
  react: {name: `react`, value: `@roots/bud-react`},
  tailwindcss: {name: `tailwindcss`, value: `@roots/bud-tailwindcss`},
  vue: {name: `vue`, value: `@roots/bud-vue`},
  emotion: {name: `emotion`, value: `@roots/bud-emotion`},
}

export default (command: CreateCommand) =>
  new MultiSelect({
    name: `component-support`,
    message: `Add support for libraries & frameworks`,
    choices: Object.values(choices),
    initial: command.support.filter(s => choices[s]),
    result(
      this: typeof MultiSelect,
      answer: Array<Record<string, string>>,
    ) {
      return Object.keys(this.map(answer)).reduce(
        (all, support) => [...all, support],
        [],
      )
    },
  })
