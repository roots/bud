import {Dashboard, Framework} from '@roots/bud-framework'

import React, {useState, useCallback, useRef} from 'react'
import {Box, Newline, Text, useInput, Static} from 'ink'
import {useStyle} from '@roots/ink-use-style'
import {isEqual} from 'lodash'
import Table from 'ink-table'
import humanFormat from 'human-format'
import {StatsCompilation} from 'webpack/types'
import patchConsole from 'patch-console'

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
  const [stdout, setStdout] = useState<string[]>([])
  const [stderr, setStderr] = useState<string[]>([])
  const [progress, setProgress] = useState<any>(null)
  const [stats, setStats] = useState<StatsCompilation>({
    errors: [],
  })

  patchConsole((stream, data) => {
    if (stream == 'stdout') {
      setStdout([...stdout, data.toString()])
    }
    if (stream == 'stderr') {
      setStderr([...stderr, data.toString()])
    }
  })

  setInterval(() => {
    setStats(instance.current.compiler.stats)
    setProgress(instance.current.compiler.progress)
  }, 10)

  useInput(input => {
    if (isEqual(input, 'q')) {
      try {
        process.exit()
      } catch (err) {}
    }
  })

  return (
    <Box flexDirection="column" marginTop={1}>
      <Static items={stdout}>
        {(out, i) => <Text key={`stdout-${i}`}>{out}</Text>}
      </Static>

      <Static items={stderr}>
        {(err, i) => <Text key={`stderr-${i}`}>{err}</Text>}
      </Static>

      <Static flexDirection="column" items={stats?.errors}>
        {errors =>
          errors.map((err, k) =>
            err.message ? (
              <Text color={theme.colors.error} key={`err-${k}`}>
                {err.message ?? err ?? ''}
                <Newline />
              </Text>
            ) : (
              []
            ),
          )
        }
      </Static>

      {stats?.errors?.length <= 1 &&
        progress &&
        stats?.children?.map((child, id) => (
          <Box
            key={`stats-${child.name}`}
            marginBottom={1}
            flexDirection={'column'}>
            <Text backgroundColor={theme.colors.primary}>
              {' '}
              {child.name} {stats.hash}
            </Text>
            <Table data={formatAssetsData(child.assets)} />
            <Text>Compiled in {child.time / 1000}s</Text>
          </Box>
        ))}
    </Box>
  )
}

export {Dashboard}
