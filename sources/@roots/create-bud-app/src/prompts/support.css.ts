/* eslint-disable no-console */
// @ts-ignore
import MultiSelect from 'enquirer/lib/prompts/multiselect.js'

import type CreateCommand from '../commands/create.js'

const choices = {
  postcss: {name: `postcss`, value: `@roots/bud-postcss`},
  sass: {name: `sass`, value: `@roots/bud-sass`},
}

export default (command: CreateCommand) =>
  new MultiSelect({
    name: `css-transpiler`,
    message: `Add css transpiler support`,
    choices: Object.values(choices),
    initial: getInitial(command),
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
  if (
    !command.support.includes(`postcss`) &&
    !command.support.includes(`sass`)
  )
    return [choices.postcss.name]

  const value = []

  command.support.includes(`postcss`) && value.push(choices.postcss.name)
  command.support.includes(`sass`) && value.push(choices.sass.name)

  return value
}
