import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

import type Bud from '../../bud/index.js'
import Render from './render.js'

const checkPackageManagerConflict = (bud: Bud): boolean => {
  if (!bud.context.config) return false

  const isConflict =
    bud.context.config[`yarn.lock`] &&
    bud.context.config[`package-lock.json`]
      ? true
      : false

  isConflict &&
    Render.once(
      <Box flexDirection="column" marginTop={1}>
        <Box flexDirection="row">
          <Box>
            <Text color="red">package manager conflict</Text>
          </Box>

          <Box flexDirection="column" paddingLeft={1}>
            <Text>
              bud has detected a conflict between yarn and npm. your
              project may not behave as expected until you remove either
              `package-lock.json` or `yarn.lock` from the project root.
            </Text>
          </Box>
        </Box>
      </Box>,
    )

  return isConflict
}

export {checkPackageManagerConflict}
