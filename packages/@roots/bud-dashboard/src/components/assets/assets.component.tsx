import {Styles} from '@roots/ink-use-style'
import {Box, Newline, Text} from 'ink'
import React from 'react'
import {StatsCompilation} from 'webpack'

import {Asset} from './asset.component'
import {Summary} from './summary.component'

export interface Props {
  stats: StatsCompilation
  theme: Styles
}

export const Dashboard = ({stats, theme}: Props) => {
  return (
    <Box flexDirection="column">
      {stats?.children?.map((child, id) => (
        <Box
          flexDirection="column"
          key={`stats-${child.name}-${id}`}>
          <Text color={theme.colors.accent}>
            ❯ {child.name} <Newline />
          </Text>

          {child.assets
            .filter(
              ({name, size}) =>
                !name.includes('.json') &&
                !name.includes('hot-update') &&
                size > 0,
            )
            .map((asset, id) => (
              <Asset
                key={`asset-${id}`}
                theme={theme}
                asset={asset}
              />
            ))}
          <Summary theme={theme} compilation={child} />
        </Box>
      ))}
    </Box>
  )
}
