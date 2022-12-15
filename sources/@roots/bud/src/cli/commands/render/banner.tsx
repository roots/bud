import type {Bud} from '@roots/bud'
import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

/**
 * Bud command
 *
 * @public
 */
export class Banner extends React.Component<{bud?: Bud}> {
  public override render() {
    return (
      <Box flexDirection="column">
        <Box flexDirection="column" justifyContent="center" paddingTop={1}>
          <Text dimColor>Initializing project</Text>
        </Box>
      </Box>
    )
  }
}
