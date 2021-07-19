import React from 'react'
import {Box, Text} from 'ink'
import type {Framework} from '@roots/bud-framework'

export const Screen = ({
  app,
  color,
  title,
  children,
}: {
  app: Framework
  color?: any
  title?: string
  children: any
}) =>
  title ? (
    <Box flexDirection="column" marginY={1}>
      <Text
        backgroundColor={app.store.get(
          color ?? 'theme.colors.primary',
        )}>
        {' '}
        {title}{' '}
      </Text>
      <Box flexDirection="column" marginTop={1}>
        {children}
      </Box>
    </Box>
  ) : (
    <Box flexDirection="column" marginTop={1}>
      {children}
    </Box>
  )
