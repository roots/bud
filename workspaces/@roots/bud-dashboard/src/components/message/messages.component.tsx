import {lodash} from '@roots/bud-support'
import {Styles} from '@roots/ink-use-style'
import {Static} from 'ink'
import React from 'react'
import {StatsCompilation} from 'webpack'

import {Message} from './message.component'

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
    <>
      {stats?.errors?.length > 0 && (
        <Static items={stats.errors}>
          {(message, id) => (
            <Message
              key={`webpack-error-${id}`}
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

      {stderr.length > 0 && (
        <Static items={stderr}>
          {(message, id) => (
            <Message
              key={`webpack-error-${id}`}
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
        <Static items={stats.warnings}>
          {(webpackWarning, id) => (
            <Message
              key={`webpack-warn-${id}`}
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
    </>
  )
}
