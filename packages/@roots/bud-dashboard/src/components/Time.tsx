import {Dashboard} from '@roots/bud-framework'
import React from 'react'
import {Text} from 'ink'

export const Time: Dashboard.Component = ({stats, theme}) =>
  stats?.time ? (
    <Text>
      ⏱{'      '}
      <Text bold color={theme.colors.success}>
        {stats?.time / 1000}s
      </Text>
    </Text>
  ) : null
