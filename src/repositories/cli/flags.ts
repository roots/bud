import {argv} from 'yargs'

const flags = {
  log: argv.hasOwnProperty('log'),
  hot: argv.hasOwnProperty('hot'),
  watch: argv.hasOwnProperty('watch'),
}

export {flags}
