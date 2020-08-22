import {argv} from 'yargs'

const flags = {
  repository: 'flags',
  contents: {
    log: argv.hasOwnProperty('log'),
    hot: argv.hasOwnProperty('hot'),
    watch: argv.hasOwnProperty('watch'),
  },
}

export {flags}
