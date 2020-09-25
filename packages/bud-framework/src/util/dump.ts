import prettyFormat from 'pretty-format'
import chalk from 'chalk'

export type Dump = (obj: any) => void

const dump: Dump = obj => {
  console.log(
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
  )
}

export {dump as default}
