import './interface'
import {Bud} from '@roots/bud'

/**
 * Extension ident
 */
export const name = '@roots/bud-babel'

/**
 * Register @emotion
 */
export const boot = (app: Bud) => {
  app.babel?.addPlugin && app.babel.addPlugin('@emotion')
}
