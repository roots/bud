import type {Bud, PostCss} from './types'

const postcss: PostCss = function ({enabled, plugins}): Bud {
  this.features.set('postcss', enabled ?? true)
  plugins &&
    this.options.set('postcss.plugins', [
      ...this.options.get('postcss.plugins'),
      ...plugins,
    ])

  return this
}

export {postcss}
