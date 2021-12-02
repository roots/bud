import {lodash} from '@roots/bud-support'
import {Styles} from '@roots/ink-use-style'
import {Box, Static} from 'ink'
import React from 'react'
import {StatsCompilation} from 'webpack'

import {Message} from './message.message'

const {isString} = lodash

export interface Props {
  stats: StatsCompilation
  stderr: Array<string>
  stdout: Array<string>
  theme: Styles
}

export const Dashboard = ({
  stats,
  stderr,
  stdout,
  theme,
}: Props) => {
  return (
    <Box flexDirection="column">
      {stats?.errorsCount > 0 && (
        <Static items={stats.errors}>
          {(message, id) => (
            <Message
              key={`webpack-error-${id}`}
              file={message.file}
              message={
                isString(message) ? message : message.message
              }
              colors={[
                theme.colors.error,
                theme.colors.foreground,
              ]}
              icon={`✘`}
            />
          )}
        </Static>
      )}

      {stderr?.length > 0 && (
        <Static items={stderr}>
          {(message, id) => (
            <Message
              key={`stderr-${id}`}
              message={message}
              colors={[
                theme.colors.error,
                theme.colors.foreground,
              ]}
              icon={`✘`}
            />
          )}
        </Static>
      )}

      {stats?.warningsCount > 0 && (
        <Box marginTop={1}>
          <Static items={stats.warnings}>
            {(webpackWarning, id) => (
              <Message
                key={`webpack-warn-${id}`}
                file={webpackWarning.file}
                message={
                  isString(webpackWarning)
                    ? webpackWarning
                    : webpackWarning.message
                }
                colors={[
                  theme.colors.warn,
                  theme.colors.foreground,
                ]}
                icon={'⚠'}
              />
            )}
          </Static>
        </Box>
      )}

      {stdout?.length > 0 && (
        <Static items={stdout}>
          {(message, id) => (
            <Message
              key={`stdout-${id}`}
              message={message}
              colors={[
                theme.colors.foreground,
                theme.colors.faded,
              ]}
              icon={'ℹ'}
            />
          )}
        </Static>
      )}
    </Box>
  )
}
