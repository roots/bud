import type {Bud, PostCss} from './types'

const postCss: PostCss = function ({enabled, ...options}): Bud {
  this.features.set('postCss', enabled ?? true)

  if (this.features.enabled('postCss')) {
    this.options.set('postcss', {
      ...this.options.get('postCss'),
      ...options,
      plugins: [...(options.plugins ?? []), ...this.options.get('postCss').plugins],
    })
  }

  return this
}

export {postCss}
