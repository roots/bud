import {ESBuild, Framework} from '@roots/bud-framework'

export const setOptions: ESBuild.SetOptions = function (
  type,
  opts,
): Framework {
  this.publish(
    {
      [`item/esbuild-${type}/options`]: base => ({
        ...base,
        ...opts,
      }),
    },
    '@roots/bud-esbuild/setOptions',
  )

  return this
}
