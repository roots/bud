import type {Bud, PostCss} from './types'

const postcss: PostCss = function ({enabled, ...options}): Bud {
  this.features.set('postcss', enabled ?? true)

  if (this.features.enabled('postcss')) {
    this.options.set('postcss', {
      ...this.options.get('postcss'),
      ...options,
      plugins: [...(options.plugins ?? []), ...this.options.get('postcss.plugins')],
    })
  }

  return this
}

export {postcss}
