import type {Bud} from '@roots/bud-framework'

import {LabelBox} from '@roots/bud/cli/components/LabelBox'
import {Box, Text} from '@roots/bud-support/ink'

interface Props {
  path?: Bud[`path`]
}

export const Paths = ({path}: Props) => {
  if (!path) return null

  const paths = [
    [`project`, path()],
    [`input`, path(`@src`)],
    [`output`, path(`@dist`)],
    [`storage`, path(`@storage`)],
  ].map(([label, dir]) => [
    label,
    dir !== path() ? dir.replace(path(), `@project`) : dir,
  ])

  return (
    <LabelBox label="Project paths">
      <Box flexDirection="column">
        {paths.map(([label, path], i) => (
          <Item key={i} label={label} path={path} />
        ))}
      </Box>
    </LabelBox>
  )
}

const Item = ({label, path}) => {
  return (
    <Box flexDirection="row" gap={1}>
      <Text>{label}:</Text>
      <Text>{path}</Text>
    </Box>
  )
}
