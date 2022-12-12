import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

import type Bud from '../../bud/index.js'
import Render from './render.js'

export const checkDependencies = async (bud: Bud) => {
  const mismatches = Object.entries({
    ...(bud.context.manifest?.dependencies ?? {}),
    ...(bud.context.manifest?.devDependencies ?? {}),
  })
    .filter(([name]) => name.startsWith(`@roots/`))
    .filter(([_, v]) => v !== bud.context.bud.version)

  mismatches?.length &&
    bud.context.bud.version !== `0.0.0` &&
    Render.once(
      <Box flexDirection="column" marginY={1}>
        {mismatches.map(([k, v]: [string, string], key: number) => {
          return (
            <Box flexDirection="row" key={key}>
              <Box>
                <Text color="red">{k}</Text>
              </Box>

              <Box flexDirection="column" paddingLeft={1}>
                <Text>
                  package version <Text color="blue">({v})</Text> does not
                  match bud.js version{` `}
                  <Text color="blue">({bud.context.bud.version})</Text>
                </Text>
              </Box>
            </Box>
          )
        })}
      </Box>,
    )

  return mismatches?.length && bud.context.bud.version !== `0.0.0`
}
