import {Box, Text} from 'ink'
import React from 'react'

import {useFormatter} from '../../hooks'

export const Asset = ({asset, theme}) => {
  const {fileSize} = useFormatter()

  return (
    <Box flexDirection="row" justifyContent="flex-start">
      <Box width={theme.ctx([theme.col(12), theme.col(8)])}>
        <Text wrap="truncate-end">
          <Text
            color={
              asset.emitted
                ? theme.colors.success
                : theme.colors.faded
            }
          >
            {asset.emitted ? '✔ ' : '.. '}
          </Text>

          {asset.name}

          {asset.cached && (
            <Text color={theme.colors.faded}> cached</Text>
          )}
        </Text>
      </Box>

      <Box width={theme.ctx([theme.col(12), theme.col(2)])}>
        {asset?.info?.minimized && (
          <Text color={theme.colors.success}>minimized</Text>
        )}
      </Box>

      <Box width={theme.ctx([theme.col(12), theme.col(2)])}>
        <Text>{fileSize(asset.size)}</Text>
      </Box>
    </Box>
  )
}
