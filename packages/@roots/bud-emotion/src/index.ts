import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'

/**
 * Extension ident
 */
export const name: Module['name'] = '@roots/bud-emotion'

/**
 * Register @emotion
 */
export const boot: Module['boot'] = (app: Framework) => {
  app.babel?.addPlugin && app.babel.addPlugin('@emotion')
}
