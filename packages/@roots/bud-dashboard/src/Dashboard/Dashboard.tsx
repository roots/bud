import {Dashboard, Framework} from '@roots/bud-framework'

import React, {useState, useRef} from 'react'
import {Box, Text, useInput, Static} from 'ink'
import {useStyle} from '@roots/ink-use-style'
import {isEqual} from 'lodash'
import Table from 'ink-table'
import humanFormat from 'human-format'

import {Progress} from './Progress'

const Dashboard = ({bud}: {bud: Framework}) => {
  const app = useRef(bud)
  const theme = useStyle(app.current.store.get('theme'))
  const [pkg] = useState<{[key: string]: string}>(
    app.current.discovery.getProjectInfo(),
  )

  const [progress, setProgress] =
    useState<{
      message: string
      decimal: number
      percentage: string
    }>(null)
  const [assets, setAssets] = useState([])
  const [development, setDevelopment] = useState(null)
  const [time, setTime] = useState(null)
  const [warnings, setWarnings] = useState([])
  const [errors, setErrors] = useState([])
  const [hasErrors, setHasErrors] = useState(false)
  const [hasWarnings, setHasWarnings] = useState(false)
  const [hash, setHash] = useState(null)

  setInterval(() => {
    setDevelopment(app.current.mode == 'development')
    setHash(app.current.compiler.stats?.hash)
    setAssets(app.current.compiler.stats?.assets)
    setProgress(app.current.compiler.progress)
    setTime(app.current.compiler.stats?.time)

    setErrors(app.current.compiler.errors)
    setWarnings(app.current.compiler.warnings)

    setHasWarnings(app.current.compiler.hasWarnings)
    setHasErrors(app.current.compiler.hasErrors)
  }, 50)

  useInput(input => {
    if (isEqual(input, 'q')) {
      try {
        process.exit()
      } catch (err) {}
    }
  })

  return (
    <>
      <Text backgroundColor={theme.colors.primary}>
        {' '}
        {pkg?.name ?? '   '} ≫ {hash ?? ''}{' '}
      </Text>

      {warnings?.length > 1 && (
        <Static items={warnings}>
          {(warning, id) => (
            <Text key={`warning-${id}`}>{warning.message}</Text>
          )}
        </Static>
      )}

      {errors?.length > 1 && (
        <Static items={errors}>
          {(error, id) => (
            <Text key={`error-${id}`}>{error.message}</Text>
          )}
        </Static>
      )}

      {assets && (
        <Box width={theme.bounds.width}>
          <Table
            data={
              assets?.length > 0
                ? assets.reduce(
                    (a, {cached, name, size, emitted, info}) => [
                      ...a,
                      ...(emitted && !cached
                        ? [
                            {
                              name,
                              immutable: info.immutable
                                ? '✔'
                                : '',
                              minimized: info.minimized
                                ? '✔'
                                : '',
                              size: humanFormat(size, {
                                prefix: 'k',
                                decimals: 2,
                              }),
                            },
                          ]
                        : []),
                    ],
                    [],
                  )
                : [
                    {
                      name: '',
                      immutable: '',
                      minimized: '',
                      size: '',
                    },
                  ]
            }
          />
        </Box>
      )}

      {time && (
        <Box>
          <Text color={theme.colors.faded}>
            {' '}
            Compiled in {time / 1000}s
          </Text>
        </Box>
      )}

      <Box marginTop={1}>
        <Progress
          progress={progress}
          theme={theme}
          hasErrors={hasErrors}
          hasWarnings={hasWarnings}
          development={development}
        />
      </Box>
    </>
  )
}

export {Dashboard}
