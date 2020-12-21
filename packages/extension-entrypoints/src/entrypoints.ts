import {Framework, Module} from '@roots/bud-typings'

export function entrypoints(
  this: Framework,
  options: Module.RawOptions,
): Framework {
  const entrypoints = this.extensions.get(
    '@roots/bud-entrypoints',
  )

  entrypoints.setOptions({
    ...entrypoints.getOptions(),
    ...options,
  })

  return this
}
