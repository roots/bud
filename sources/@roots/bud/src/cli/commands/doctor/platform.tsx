import {platform} from 'node:os'

import figures from '@roots/bud-support/figures'
import {Box, Text} from '@roots/bud-support/ink'

import {LabelBox} from '../../components/LabelBox.js'

export const Platform = () => {
  const os = platform()
  const error = os === `win32`

  if (!error)
    return (
      <LabelBox flexDirection="row" label="Platform">
        <Box flexDirection="row" gap={1}>
          {!error ? (
            <Text color="green">{figures.tick}</Text>
          ) : (
            <Text color="red">{figures.cross}</Text>
          )}
          <Text>{os}</Text>
        </Box>
      </LabelBox>
    )
}
