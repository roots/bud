import type {Bud} from '@roots/bud'
import {Box, Text} from '@roots/bud-support/ink'
import format from '@roots/bud-support/pretty-format'

const DisplayGeneratedConfig = ({bud}: {bud: Bud}) => {
  if (!bud.build?.config) {
    return (
      <Box flexDirection="column">
        <Text color="blue">
          {`\n`} Generated config{`\n`}
        </Text>
        <Text dimColor>The configuration could not be generated</Text>
      </Box>
    )
  }

  return (
    <Box flexDirection="column">
      <Text color="blue">
        {`\n`}Generated config{`\n`}
      </Text>
      <Text>{format(bud.build.config)}</Text>
    </Box>
  )
}

export {DisplayGeneratedConfig as default}
