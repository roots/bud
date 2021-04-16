import {Dashboard} from '@roots/bud-framework'
import React from 'react'
import {Text, Box} from 'ink'

export const Time: Dashboard.Component = ({stats, theme}) =>
  stats?.time ? (
    <Box marginTop={1}>
      <Text>
        Compiled in{' '}
        <Text bold color={theme.colors.success}>
          {stats?.time / 1000}s
        </Text>
      </Text>
    </Box>
  ) : null
