import type {Bud} from '@roots/bud-framework'

export type Parameters = [Record<string, Array<string> | string>]

export interface provide {
  (...parameters: Parameters): Promise<Bud>
}

export const provide: provide = async function (this: Bud, packages) {
  if (!packages) {
    throw new Error(`bud.provide: packages must be an object`)
  }

  const plugin = this.extensions.get(
    `@roots/bud-extensions/webpack-provide-plugin`,
  )
  const options = plugin.getOptions()
  const modified = Object.entries(packages).reduce(
    (
      acc: Record<string, string>,
      [key, value]: [string, Array<string> | string],
    ) => {
      const normalValue = Array.isArray(value) ? value : [value]

      return {
        ...(acc ?? {}),
        ...normalValue.reduce(
          (all, item) => ({
            ...(all ?? {}),
            [item]: key,
          }),
          {},
        ),
      }
    },
    options ?? {},
  )

  plugin.setOptions(modified)

  return this
}
