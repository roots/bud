/* eslint-disable no-console */
// @ts-ignore
import MultiSelect from 'enquirer/lib/prompts/multiselect.js'

import type CreateCommand from '../commands/create.js'

const choices = {
  eslint: {name: `eslint`, value: `@roots/bud-eslint`},
  prettier: {name: `prettier`, value: `@roots/bud-prettier`},
  stylelint: {name: `stylelint`, value: `@roots/bud-stylelint`},
}

export default (command: CreateCommand) =>
  new MultiSelect({
    name: `component-support`,
    message: `Add support for linters & test frameworks`,
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
