import type {Bud, PostCss} from './types'

const postCss: PostCss = function ({
  enabled = true,
  ...options
}): Bud {
  this.features.set({postCss: enabled ?? true})

  if (this.features.enabled('postCss')) {
    this.options.merge('postcss', options)
  }

  return this
}

export {postCss}
