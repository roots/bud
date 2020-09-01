import {Api} from '@roots/bud-typings'

const postcss: Api.PostCss = function ({plugins}) {
  this.features.set('postcss', true)

  plugins &&
    this.options.set('postcss.plugins', [
      ...this.options.get('postcss.plugins'),
      ...plugins,
    ])

  return this
}

export {postcss}
