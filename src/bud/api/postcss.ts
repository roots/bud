import type {Bud, PostCss} from './types'

const postCss: PostCss = function ({
  enabled = true,
  ...options
}): Bud {
  this.state.features.postCss = enabled

  if (this.state.features.postCss) {
    this.state.options.postCss = {
      ...this.state.options.postCss,
      ...options,
    }
  }

  return this
}

export {postCss}
