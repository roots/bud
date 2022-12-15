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
        <Box flexDirection="column">
          <Text backgroundColor="red" color="white">
            No package manager detected
          </Text>

          <Text>
            bud.js looked for a `packageManager` property in your
            `package.json` file, but found none. There is also no
            `yarn.lock` or `package-lock.json` file in the project. Can't
            determine package manager in use.
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
