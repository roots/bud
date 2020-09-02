import prettyFormat from 'pretty-format'
import {highlight} from 'cli-highlight'
import chalk from 'chalk'

export type Dump = (obj: any, parser?: any) => typeof obj

const dump: Dump = (obj, parser) => {
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
