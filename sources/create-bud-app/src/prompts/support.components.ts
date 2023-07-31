/* eslint-disable no-console */
// @ts-ignore
import MultiSelect from 'enquirer/lib/prompts/multiselect.js'

import type CreateCommand from '../commands/create.js'

const choices = {
  emotion: {name: `emotion`, value: `@roots/bud-emotion`},
  react: {name: `react`, value: `@roots/bud-react`},
  tailwindcss: {name: `tailwindcss`, value: `@roots/bud-tailwindcss`},
  vue: {name: `vue`, value: `@roots/bud-vue`},
}

export default (command: CreateCommand) =>
  new MultiSelect({
    choices: Object.values(choices),
    initial: command.support.filter(s => choices[s]),
    message: `Add support for libraries & frameworks`,
    name: `component-support`,
    result(
      this: typeof MultiSelect,
      answer: Array<Record<string, string>>,
    ): Array<string> {
      const records = this.map(answer) as Record<string, unknown>
      const answers = Object.keys(records)
      return answers
    },
  })
