import {
  highlight as highlightLib,
  HighlightOptions,
} from 'cli-highlight'
import chalk from 'chalk'

const highlight = (
  text: string,
  options?: HighlightOptions,
): string =>
  highlightLib(text, {
    language: 'js',
    theme: {
      regexp: chalk.green,
    },
    ...(options ?? []),
  })

export {highlight as default}
