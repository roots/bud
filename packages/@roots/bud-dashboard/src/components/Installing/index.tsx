import type {Framework} from '@roots/bud-framework'
import type {Styles} from '@roots/ink-use-style'
import {Box, Text} from 'ink'
import Spinner from 'ink-spinner'
import React, {useLayoutEffect, useState} from 'react'

interface Props {
  app: Framework
  styles: Styles
}

export const Installing = ({app, styles}: Props) => {
  const [current, setCurrent] = useState(null)
  const [finished, setFinished] = useState([])

  useLayoutEffect(() => {
    app?.dependencies?.installing &&
      setCurrent(app.dependencies.installing)
  }, [app?.dependencies?.installing])

  useLayoutEffect(() => {
    app?.dependencies?.installed &&
      setFinished(app.dependencies.installed)
  }, [app?.dependencies?.installed])

  return !current && !finished.length ? null : (
    <Box flexDirection="column">
      {current && (
        <Box marginBottom={1} flexDirection="column">
          <Text
            backgroundColor={styles.colors.primary}
            color={styles.colors.foreground}>
            {' '}
            Installing project requirements
          </Text>
          <Text>
            <Spinner /> Installing {current[0]}@{current[1]}
          </Text>
        </Box>
      )}

      {finished.length > 0 && (
        <Box marginBottom={1} flexDirection="column">
          {finished.map(dep => (
            <Text key={`${dep.name}-${dep.ver}`}>
              <Text color={styles.colors.success}>✓</Text>
              {` ${dep.name}@${dep.ver}`}
            </Text>
          ))}
        </Box>
      )}
    </Box>
  )
}
