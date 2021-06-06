import {Dashboard, Framework} from '@roots/bud-framework'

import React, {useState, useRef} from 'react'
import {Box, Newline, Text, useInput} from 'ink'
import {useStyle} from '@roots/ink-use-style'
import {isEqual} from 'lodash'
import Table from 'ink-table'
import humanFormat from 'human-format'
import {Progress} from './Progress'
import {StatsCompilation} from 'webpack/types'
import patchConsole from 'patch-console'

const formatAssetsData = assets =>
  assets.reduce(
    (a, {name, size, emitted, info}) => [
      ...a,
      {
        name: `${emitted ? '❇ ' : ''}${name}`,
        immutable: info?.immutable ? '✔' : '',
        minimized: info?.minimized ? '✔' : '',
        size: humanFormat(size, {
          prefix: 'k',
          decimals: 2,
        }),
      },
    ],
    [],
  )

const Dashboard = ({bud}: {bud: Framework}) => {
  const app = useRef(bud)

  const theme = useStyle(app.current.store.get('theme'))

  const [progress, setProgress] =
    useState<{
      message: string
      decimal: number
      percentage: string
    }>(null)
  const [stats, setStats] = useState<StatsCompilation>(null)

  setInterval(() => {
    setStats(app.current.compiler.stats)
    setProgress(app.current.compiler.progress)
  }, 50)

  patchConsole((stream, data) => {})

  useInput(input => {
    if (isEqual(input, 'q')) {
      try {
        process.exit()
      } catch (err) {}
    }
  })

  return (
    <Box flexDirection="column">
      <Text backgroundColor={theme.colors.primary}>
        {' '}
        {app.current.mode
          ? `${app.current.name}@${app.current.mode} `
          : ''}
        {stats?.hash ? `#${stats.hash} ` : ''}
      </Text>

      {stats?.errors?.length > 1 ? (
        <Box marginY={1} flexDirection="column">
          {stats.errors.map((err, k) =>
            err.message ? (
              <Text color={theme.colors.error} key={`err-${k}`}>
                {err.message ?? err ?? ''}
                <Newline />
              </Text>
            ) : (
              []
            ),
          )}
        </Box>
      ) : null}

      {stats?.assets?.length > 1 &&
        !(stats?.errors?.length > 1) && (
          <Table data={formatAssetsData(stats?.assets)} />
        )}

      {stats?.time && (
        <Box>
          <Text color={theme?.colors?.faded}>
            {' '}
            Compiled in {stats?.time / 1000}s
          </Text>
        </Box>
      )}

      {stats?.errors?.length <= 1 && progress?.decimal < 1 && (
        <Box marginTop={1}>
          <Progress
            progress={progress}
            theme={theme}
            mode={stats?.mode}
          />
        </Box>
      )}
    </Box>
  )
}

export {Dashboard}
