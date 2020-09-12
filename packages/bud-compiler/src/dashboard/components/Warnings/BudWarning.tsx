import React from 'react'
import {Box, Text, Spacer} from 'ink'
import {Bud} from '@roots/bud-types'

const BudWarning = (bud: Bud) => (
  <>
    {bud.features.enabled('runtimeChunk') && (
      <Box
        marginTop={1}
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        alignSelf="flex-start">
        <Text backgroundColor="red" color="white">
          You currently have{' '}
          <Text bold>runtimeChunks (inline manifest)</Text>{' '}
          enabled in development mode. This will probably break
          hot module reloading. Recommendation is to move this
          into a production only block in your config file.
        </Text>
        <Text> </Text>
        <Text>Example:</Text>
        <Text>
          {bud.util.highlight(`
  bud.when(
  bud.mode.is('production'),
  () => bud.runtimeManifest()
  )
  `)}
        </Text>
        <Spacer />
      </Box>
    )}
  </>
)

export {BudWarning as default}
