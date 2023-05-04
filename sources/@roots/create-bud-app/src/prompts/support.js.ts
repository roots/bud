/* eslint-disable no-console */
// @ts-ignore
import MultiSelect from 'enquirer/lib/prompts/multiselect.js'

import type CreateCommand from '../commands/create.js'

const choices = {
  swc: {name: `swc`, value: `@roots/bud-swc`},
  babel: {name: `babel`, value: `@roots/bud-babel`},
  typescript: {name: `typescript`, value: `@roots/bud-typescript`},
}

export default (command: CreateCommand) =>
  new MultiSelect({
    name: `transpiler`,
    message: `Add transpiler support`,
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
    !command.support.includes(`swc`) &&
    !command.support.includes(`typescript`) &&
    !command.support.includes(`babel`)
  )
    return [choices.swc]

  const value = []

  command.support.includes(`swc`) && value.push(choices.swc.name)
  command.support.includes(`babel`) && value.push(choices.babel.name)
  command.support.includes(`typescript`) &&
    value.push(choices.typescript.name)

  return value
}
