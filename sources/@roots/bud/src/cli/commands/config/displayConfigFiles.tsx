import type {Bud} from '@roots/bud'
import {Box, Text} from '@roots/bud-support/ink'

const DisplayConfigFiles = ({bud}: {bud: Bud}) => {
  const configs = Object.values(bud.context.files)

  if (!configs?.length) {
    return (
      <Box flexDirection="column">
        <Text color="blue">
          {`\n`} Configuration files{`\n`}
        </Text>
        <Text dimColor>No configuration files found in project</Text>
      </Box>
    )
  }

  return (
    <Box flexDirection="column">
      <Text color="blue">
        {`\n`}Configuration files{`\n`}
      </Text>

      {configs.map(({bud: isBudConfig, path}, i) => (
        <Box key={i}>
          <Text dimColor>{path.replace(bud.path(), `.`)}</Text>
          {isBudConfig && <Text>{` (bud config)`}</Text>}
        </Box>
      ))}
    </Box>
  )
}

export {DisplayConfigFiles as default}
