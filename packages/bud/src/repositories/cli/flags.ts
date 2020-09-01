import {argv} from 'yargs'
import type {RepositoryDefinition} from '@roots/bud-typings'

const flags: RepositoryDefinition = {
  name: 'flags',
  register: {
    log: argv.hasOwnProperty('log'),
    hot: argv.hasOwnProperty('hot'),
    watch: argv.hasOwnProperty('watch'),
  },
}

export {flags}
