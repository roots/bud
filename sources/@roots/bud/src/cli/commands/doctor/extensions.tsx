import type {Extension} from '@roots/bud-framework/extension'

import {Box, Text} from '@roots/bud-support/ink'

export const Extensions = ({
  extensions,
  label,
}: {
  extensions: Array<[string, Extension]>
  label: string
}) => {
  return (
    <Box flexDirection="column" gap={1}>
      <Text color="blue">{label}</Text>
      <Box flexDirection="column">
        {extensions.map(([name, extension], i) => (
          <Item key={`extension-${name}-${i}`} name={name} />
        ))}
      </Box>
    </Box>
  )
}

const Item = ({name}: {name: string}) => {
  return (
    <Box flexDirection="column">
      <Text color="white">{name}</Text>
    </Box>
  )
}
