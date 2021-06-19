import {Dashboard, Framework} from '@roots/bud-framework'

import React, {useState, useCallback, useRef} from 'react'
import {Box, Newline, Text, useInput, Static} from 'ink'
import {useStyle} from '@roots/ink-use-style'
import {isEqual} from 'lodash'
import Table from 'ink-table'
import humanFormat from 'human-format'
import {StatsCompilation} from 'webpack/types'
import patchConsole from 'patch-console'
import {Progress} from './Progress'

const useForceUpdate = () => {
  const [, forceUpdate] = React.useState(true)

  return useCallback(() => {
    forceUpdate(s => !s)
  }, [])
}

const formatAssetsData = assets =>
  assets
    .filter(({name}) => name !== 'manifest.json')
    .reduce(
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
  useForceUpdate()

  const instance = useRef<Framework>(bud)

  const theme = useStyle(bud?.store?.get('theme'))
  const [progress, setProgress] = useState<any>(null)
  const [stats, setStats] = useState<StatsCompilation>({
    errors: [],
  })

  patchConsole((stream, data) => {})

  setInterval(() => {
    setStats(instance.current.compiler.stats)
    setProgress(instance.current.compiler.progress)
  }, 10)

  useInput(input => {
    if (isEqual(input, 'q')) {
      try {
        bud.compiler.instance.close(() => {
          setTimeout(() => process.exit(), 10)
        })
      } catch (err) {}
    }
  })

  return (
    <Box flexDirection="column" marginTop={1}>
      <Static flexDirection="column" items={stats?.errors}>
        {(err, k) =>
          err.message ? (
            <Text key={`err-${k}`}>
              {err.message ?? err ?? ''}
              <Newline />
            </Text>
          ) : (
            []
          )
        }
      </Static>

      {stats?.errors?.length <= 1 &&
        progress &&
        stats?.children?.map((child, id) => (
          <Box
            key={`stats-${child.name}-${id}`}
            marginBottom={1}
            flexDirection={'column'}>
            <Text backgroundColor={theme.colors.primary}>
              {' '}
              {child.name}{' '}
            </Text>
            <Table data={formatAssetsData(child.assets)} />
            <Text>Compiled in {child.time / 1000}s</Text>
          </Box>
        ))}

      {progress && progress[0] && progress[0] < 1 && (
        <Progress
          progress={progress}
          theme={theme}
          mode={instance.current.mode}
        />
      )}
    </Box>
  )
}

export {Dashboard}
