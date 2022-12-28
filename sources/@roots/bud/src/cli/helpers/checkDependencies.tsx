import type {Bud} from '@roots/bud'
import {isInternalDevelopmentEnv} from '@roots/bud/cli/helpers/isInternalDevelopmentEnv'
import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

export const checkDependencies = async (bud: Bud) => {
  if (isInternalDevelopmentEnv(bud)) return false

  const mismatches = Object.entries({
    ...(bud.context.manifest?.dependencies ?? {}),
    ...(bud.context.manifest?.devDependencies ?? {}),
  })
    .filter(([name]) => name.startsWith(`@roots/`))
    .filter(([signifier, version]: [string, string]) => {
      version = version.replace(`^`, ``)
      return version !== bud.context.bud.version
    })

  mismatches?.length &&
    bud.dashboard.renderer.once(
      <Box flexDirection="column" marginY={1}>
        {mismatches.map(([k, v]: [string, string], key: number) => {
          return (
            <Box flexDirection="row" key={key}>
              <Box>
                <Text color="red">{k}</Text>
              </Box>

              <Box flexDirection="column" paddingLeft={1}>
                <Text>
                  Installed version <Text color="blue">({v})</Text> does
                  not match bud.js version{` `}
                  <Text color="blue">({bud.context.bud.version})</Text>
                </Text>
              </Box>
            </Box>
          )
        })}
      </Box>,
    )

  return mismatches?.length
}
