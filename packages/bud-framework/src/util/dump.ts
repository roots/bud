import prettyFormat from 'pretty-format'
import {highlight} from 'cli-highlight'
import chalk from 'chalk'

export type Dump = (obj: any) => void

const dump: Dump = obj => {
  console.log(
    highlight(
      prettyFormat(obj, {
        callToJSON: true,
        highlight: true,
        indent: 2,
      }),
      {
        language: 'js',
        theme: {
          regexp: chalk.green,
        },
      },
    ),
  )
}

export {dump as default}
