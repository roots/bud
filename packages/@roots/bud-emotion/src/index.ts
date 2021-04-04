import './interface'
import {Framework, Module} from '@roots/bud-framework'

/**
 * Extension ident
 */
export const name: Module['name'] = '@roots/bud-emotion'

/**
 * Dev dependencies
 */
export const devDependencies: Module['devDependencies'] = [
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
