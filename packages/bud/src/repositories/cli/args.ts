import {argv} from 'yargs'
import type {RepositoryDefinition} from '@roots/bud-types'

const args: RepositoryDefinition = {
  name: 'args',
  register: argv,
}

export {args}
