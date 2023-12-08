import type {Extension} from '@roots/bud-framework/extension'

import {Box, Text} from '@roots/bud-support/ink'

import {LabelBox} from '../../components/LabelBox.js'

export const Extensions = ({
  extensions,
  label,
}: {
  extensions?: Array<[string, Extension]>
  label: string
}) => {
  if (!extensions?.length) return null

  return (
    <LabelBox label={label}>
      {extensions.map(([name, extension], i) => (
        <Item key={`extension-${name}-${i}`} name={name} />
      ))}
    </LabelBox>
  )
}

const Item = ({name}: {name: string}) => {
  return (
    <Box flexDirection="column">
      <Text color="white">{name}</Text>
    </Box>
  )
}
