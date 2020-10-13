export const ident: Build.Item['ident'] = 'sass'

export const loader: Build.Item['loader'] = 'sass'

export const options: Build.Item['options'] = {
  implementation: (() => {
    let implementation: unknown

    try {
      implementation = require.resolve('sass')
    } catch {
      implementation = require('node-sass')
    }

    return implementation
  })(),
}
