import {Box, Text} from 'ink'
import React from 'react'

import {useFormatter} from '../../hooks'

export const Asset = ({asset, theme}) => {
  const {fileSize} = useFormatter()

  return (
    <Box
      flexDirection={theme.ctx(['column', 'row'])}
      marginBottom={theme.ctx([1, 0])}
      justifyContent="flex-start">
      <Box
        width={theme.ctx([
          theme.col(12),
          theme.col(6),
          theme.col(7),
        ])}>
        <Text wrap="truncate-end">
          <Text
            color={
              asset.emitted
                ? theme.colors.success
                : theme.colors.faded
            }>
            {asset.emitted ? '✔ ' : '… '}
          </Text>

          {asset.name}

          {asset.cached && (
            <Text color={theme.colors.faded}> cached</Text>
          )}
        </Text>
      </Box>

      <Box
        display={theme.ctx(['none', 'none', 'none', 'flex'])}
        width={theme.ctx([0, 0, 0, theme.col(3)])}>
        {asset.chunkNames?.length ? (
          <Text color={theme.colors.faded}>
            {' '}
            [{asset.chunkNames.join(' ')}]
          </Text>
        ) : (
          <Text color={theme.colors.faded}>
            {' '}
            [
            {asset.name.includes('.')
              ? asset.name.split('.').pop()
              : 'none'}
            ]
          </Text>
        )}
      </Box>

      <Box
        display={theme.ctx(['none', 'none', 'flex'])}
        width={theme.ctx([0, 0, theme.col(2)])}>
        {asset?.info?.minimized ? (
          <Text color={theme.colors.success}>✔ min</Text>
        ) : (
          <Text color={theme.colors.faded}>✘ min</Text>
        )}
      </Box>

      <Box
        width={theme.ctx([
          theme.col(12),
          theme.col(3),
          theme.col(3),
          theme.col(3),
        ])}>
        <Text color={theme.colors.faded}>
          {fileSize(asset.size)}
        </Text>
      </Box>
    </Box>
  )
}
