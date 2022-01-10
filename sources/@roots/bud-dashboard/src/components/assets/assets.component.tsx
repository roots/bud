import {Styles} from '@roots/ink-use-style'
import {Newline, Text} from 'ink'
import React, {Fragment} from 'react'
import {StatsCompilation} from 'webpack'

import {Asset} from './asset.component'
import {Summary} from './summary.component'

export interface Props {
  stats: StatsCompilation
  theme: Styles
}

export const Dashboard = ({stats, theme}: Props) => {
  return (
    <Fragment>
      {stats?.children?.map((child, id) => (
        <Fragment key={`stats-${child.name}-${id}`}>
          <Text backgroundColor={theme.colors.secondaryAlt} bold>
            {child.outputPath.replace(process.cwd(), '.')}
            <Newline />
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
                compilation={child}
                theme={theme}
                asset={asset}
              />
            ))}
          <Summary theme={theme} compilation={child} />
        </Fragment>
      )) ?? null}
    </Fragment>
  )
}
