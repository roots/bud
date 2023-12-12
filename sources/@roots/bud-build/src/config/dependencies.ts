import type {Factory} from '@roots/bud-build/config'

import {ConfigError} from '@roots/bud-support/errors'
import isUndefined from '@roots/bud-support/isUndefined'

export const dependencies: Factory<`dependencies`> = async ({
  hooks,
  label,
  root,
}) => {
  const dependencies = hooks
    .filter(`build.dependencies`, [])
    ?.filter(dependency => {
      const defined = !isUndefined(root.children?.[dependency])

      if (!defined) {
        throw ConfigError.normalize(
          `${dependency} is not a registered instance of bud.js.`,
          {
            details: root.children
              ? `Available instances are: ${Object.values(root.children)
                  .map(child => child.label)
                  .join(`, `)}`
              : `We would tell you what the available instances are, but there are none registered.`,
            docs: new URL(
              `https://bud.js.org/learn/general-use/multi-instance`,
            ),
            instance: label,
            thrownBy: `@roots/bud-build/config/dependencies`,
          },
        )
      }

      return true
    })

  if (!dependencies || dependencies?.length < 1) return undefined

  return dependencies
}
