import {Webpack, Bud} from '@roots/bud-typings'
import {oneOf} from './oneOf'
import post from './post'
import pre from './pre'

type Rules = Webpack.Configuration['module']['rules']
type Build = (this: Bud.App) => {rules: Rules}

export const rules: Build = function () {
  return {
    rules: this.hooks.filter<Rules>('webpack.module.rules', [
      ...pre.bind(this)(),
      {
        oneOf: oneOf.bind(this)(),
      },
      ...post.bind(this)(),
    ]),
  }
}
