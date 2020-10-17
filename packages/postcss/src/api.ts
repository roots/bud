import type {PostCss} from './'

export const postcss: PostCss.Config = function (options) {
  this.features.enable('postcss')

  this.components['items']
    .get('postcss')
    .setOptions({...options})

  return this
}
