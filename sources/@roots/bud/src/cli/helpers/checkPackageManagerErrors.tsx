/* eslint-disable react/no-unescaped-entities */
import type {Bud} from '@roots/bud'
import {
  isNoPackageManager,
  isPackageManagerConflict,
} from '@roots/bud/cli/helpers/isPackageManagerError'
import {Renderer} from '@roots/bud-dashboard/renderer'
import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

export const checkNoPackageManager = (bud: Bud): boolean => {
  if (!bud.context.config) return false

  isNoPackageManager(bud) &&
    Renderer.once(
      <Box flexDirection="column">
        <Box marginTop={1}>
          <Text color="red">could not determine package manager</Text>
        </Box>

        <Box flexDirection="column">
          <Text>
            bud.js looked for a <Text color="blue">`packageManager`</Text>
            property in your <Text color="blue">`package.json`</Text> file,
            but found none.
          </Text>
          <Text>
            There is also no <Text color="blue">`yarn.lock`</Text> or
            <Text color="blue">`package-lock.json`</Text> file in the
            project.
          </Text>
        </Box>
      </Box>,
    )

  return isNoPackageManager(bud)
}

export const checkPackageManagerConflict = (bud: Bud): boolean => {
  if (!bud.context.config) return false

  isPackageManagerConflict(bud) &&
    Renderer.once(
      <Box flexDirection="column">
        <Box flexDirection="row">
          <Box flexDirection="column">
            <Text backgroundColor="red" color="white">
              Package manager conflict
            </Text>
          </Box>

          <Box flexDirection="column" paddingLeft={1}>
            <Text>
              Your project may not behave as expected until you remove
              either `package-lock.json` or `yarn.lock` from the project
              root.
            </Text>
          </Box>
        </Box>
      </Box>,
    )

  return isPackageManagerConflict(bud)
}
