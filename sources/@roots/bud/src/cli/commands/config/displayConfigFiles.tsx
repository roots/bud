import type {Bud} from '@roots/bud'

import {Box, Text} from '@roots/bud-support/ink'

import {LabelBox} from '../../components/LabelBox.js'

const DisplayConfigFiles = ({bud}: {bud: Bud}) => {
  const configs = Object.values(bud.context.files).map(file => ({
    ...file,
    path: file.path.replace(bud.path(), `.`),
  }))

  if (!configs?.length) {
    return (
      <LabelBox
        label="Configuration files"
        value="No configuration files found in project"
      />
    )
  }

  return (
    <LabelBox label="Configuration files">
      {configs.map((file, i) => (
        <Item key={i} {...file} />
      ))}
    </LabelBox>
  )
}

const Item = ({bud: isBudConfig, path}) => (
  <Box flexDirection="row" gap={1}>
    <Text dimColor>{path}</Text>
    {isBudConfig && <Text>{`(bud config)`}</Text>}
  </Box>
)

export {DisplayConfigFiles as default}
