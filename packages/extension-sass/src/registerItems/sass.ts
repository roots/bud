export const ident: Framework.Item['ident'] = 'sass'

export const loader: Framework.Item['loader'] = 'sass'

export const options: Framework.Item['options'] = {
  implementation: (() => {
    let implementation: unknown

    try {
      implementation = require('sass')
    } catch {
      implementation = require('node-sass')
    }

    return implementation
  })(),
}
