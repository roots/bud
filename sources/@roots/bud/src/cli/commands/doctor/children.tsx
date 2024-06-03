import type {Bud} from '@roots/bud-framework'

import {LabelBox} from '@roots/bud/cli/components/LabelBox'
import {Box, Text} from '@roots/bud-support/ink'

export const Children = ({
  compilers,
}: {
  compilers: Record<string, Bud>
}) => {
  if (!compilers) return null

  const labels = Object.values(compilers).map((child, i) => child.label)

  return (
    <LabelBox label="Child compilers">
      <Box flexDirection="column">
        {labels.map((label, i) => (
          <Text key={i}>{label}</Text>
        ))}
      </Box>
    </LabelBox>
  )
}
