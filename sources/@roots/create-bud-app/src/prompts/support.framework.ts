/* eslint-disable no-console */
// @ts-ignore
import MultiSelect from 'enquirer/lib/prompts/multiselect.js'

import type CreateCommand from '../commands/create.js'

const choices = {
  react: {name: `react`, value: `@roots/bud-react`},
  tailwindcss: {name: `tailwindcss`, value: `@roots/bud-tailwindcss`},
  vue: {name: `vue`, value: `@roots/bud-react`},
}

export default (command: CreateCommand) =>
  new MultiSelect({
    name: `framework-support`,
    message: `Add framework support`,
    choices: Object.values(choices).map(choice => ({
      ...choice,
      checked: getInitial(command).includes(choice.value),
    })),
    result(
      this: typeof MultiSelect,
      answer: Array<Record<string, string>>,
    ) {
      return Object.entries(this.map(answer)).reduce(
        (all, [, value]) => [...all, value],
        [],
      )
    },
  })

const getInitial = (command: CreateCommand) => {
  const value = []

  command.support.includes(`react`) && value.push(choices.react)
  command.support.includes(`vue`) && value.push(choices.vue)

  return value
}
