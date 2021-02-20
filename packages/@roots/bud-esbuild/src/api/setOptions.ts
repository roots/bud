import type {Bud} from '@roots/bud'

export const setOptions: Bud.ESBuild.SetOptions = function (
  opts,
) {
  this.build.merge('items.esbuild.options', opts)

  return this
}
