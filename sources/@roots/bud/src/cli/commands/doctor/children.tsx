import type {Bud} from '@roots/bud-framework'

import {Box, Text} from '@roots/bud-support/ink'

import {LabelBox} from '../../components/LabelBox.js'

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
