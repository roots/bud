import type {Framework} from '@roots/bud-framework'

export const setOptions: Framework.ESBuild.SetOptions = function (
  opts,
) {
  this.build.merge('items.esbuild.options', opts)

  return this
}
