import type {Bud} from '@roots/bud-framework'

import {Box, Text} from '@roots/bud-support/ink'

import {LabelBox} from '../../components/LabelBox.js'

export const Server = ({bud}: {bud: Bud}) => {
  if (!bud) return null

  if (!bud.isDevelopment)
    return (
      <LabelBox label="Development server">
        <Box flexDirection="column">
          <Text>
            Not available in <Text color="cyan">`production`</Text> mode.
          </Text>
          <Text>
            Run this command with{` `}
            <Text color="cyan">--mode=development</Text> for server
            information.
          </Text>
        </Box>
      </LabelBox>
    )

  const showProxy =
    bud.server?.enabledMiddleware &&
    Object.keys(bud.server.enabledMiddleware).includes(`proxy`) &&
    bud.server.proxyUrl

  return (
    <LabelBox label="Development server">
      <Box flexDirection="row" gap={1}>
        <Text>URL:</Text>
        <Text>{bud.server.url.href}</Text>
      </Box>

      {showProxy && (
        <Box flexDirection="row" gap={1}>
          <Text>Proxy:</Text>
          <Text>{bud.server.proxyUrl.href}</Text>
        </Box>
      )}
    </LabelBox>
  )
}
