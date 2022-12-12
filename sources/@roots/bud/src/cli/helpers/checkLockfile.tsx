import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

import type Bud from '../../bud/index.js'
import Render from './render.js'

const checkLockfile = (bud: Bud): boolean => {
  if (
    bud.context.config?.[`yarn.lock`] ||
    bud.context.config?.[`package-lock.json`]
  )
    return false

  Render.once(
    <Box flexDirection="column" marginY={1}>
      <Box flexDirection="row">
        <Box>
          <Text color="red">project not installed</Text>
        </Box>

        <Box flexDirection="column" paddingLeft={1}>
          <Text>
            run <Text color="blue">`yarn`</Text> or
            <Text color="blue">`npm install`</Text> to install project
            dependencies
          </Text>
        </Box>
      </Box>
    </Box>,
  )

  return true
}

export {checkLockfile}
