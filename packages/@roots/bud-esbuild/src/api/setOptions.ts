import type {Framework} from '@roots/bud-framework'

export const setOptions: Framework.ESBuild.SetOptions = function (
  type,
  opts,
) {
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
