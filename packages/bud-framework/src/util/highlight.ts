import {highlight as highlightLib} from 'cli-highlight'
import chalk from 'chalk'

const highlight = (text, options = {}) =>
  highlightLib(text, {
    language: 'js',
    theme: {
      regexp: chalk.green,
    },
    ...options,
  })

export {highlight as default}
