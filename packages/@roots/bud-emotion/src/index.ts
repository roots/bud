import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'

/**
 * Extension ident
 */
export const name: Module['name'] = '@roots/bud-emotion'

/**
 * Dev dependencies
 */
export const devDependencies = [
  '@emotion/css',
  '@emotion/react',
  '@emotion/styled',
]

/**
 * Register @emotion
 */
export const boot: Module['boot'] = (app: Framework) => {
  app.babel?.setPlugins &&
    app.babel.setPlugins([
      ['@emotion', {}],
      ...app.subscribe('item/babel/options/plugins'),
    ])
}
