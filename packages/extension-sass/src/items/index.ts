import type Framework from '@roots/bud-typings'

export const ident: Item['ident'] = 'sass'

export const loader: Item['loader'] = 'sass-loader'

export const options: Item['options'] = {
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

declare type Item = Framework.Item.Contract
