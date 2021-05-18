import {ESBuild, Framework} from '@roots/bud-framework'

export const setOptions: ESBuild.SetOptions = function (
  type,
  opts,
): Framework {
  this.items[`item/esbuild-${type}`].setOptions(app => ({
    ...app.build.items[`item/esbuild-${type}`].options,
    ...opts,
  }))

  return this
}
